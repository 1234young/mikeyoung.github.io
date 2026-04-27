import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// MIDDLEWARE — requireAuth
// Verifies JWT token before every route below, Attaches decoded user id to req.user
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Session expired.' });
  }
}

// Apply auth middleware to all routes in this file
router.use(requireAuth);


// POST /api/progress/:workoutId
// Marks a workout as completed for the logged-in user
router.post('/:workoutId', async (req, res) => {
  const workoutId = parseInt(req.params.workoutId);

  if (!workoutId) {
    return res.status(400).json({ success: false, message: 'Invalid workout ID.' });
  }

  try {
    // Insert a new completion record
    // user can complete the same workout multiple times on different days
    await pool.query(
      'INSERT INTO progress (user_id, workout_id) VALUES (?, ?)',
      [req.user.id, workoutId]
    );

    return res.status(201).json({ success: true, message: 'Workout marked as complete!' });

  } catch (err) {
    console.error('Mark complete error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// GET /api/progress/stats
// Returns all stats needed for the progress page:
// - Total completions
// - Current weekly streak
// - Completion history with workout names
// - Workouts completed per day (last 7 days)
router.get('/stats', async (req, res) => {
  try {

    // 1. TOTAL COMPLETIONS 
    const [[{ total }]] = await pool.query(
      'SELECT COUNT(*) as total FROM progress WHERE user_id = ?',
      [req.user.id]
    );

    // 2. COMPLETION HISTORY 
    // Join with workouts table to get workout names, ORDER BY newest first so history shows most recent at top
    const [history] = await pool.query(
      `SELECT p.id, p.completed_at, w.name as workout_name, w.category
       FROM progress p
       JOIN workouts w ON p.workout_id = w.id
       WHERE p.user_id = ?
       ORDER BY p.completed_at DESC
       LIMIT 20`,
      [req.user.id]
    );

    // 3. LAST 7 DAYS ACTIVITY 
    // Count how many workouts completed each day for the last 7 days
    // DATE(completed_at) strips the time part so we group by day only
    const [weeklyData] = await pool.query(
      `SELECT DATE(completed_at) as day, COUNT(*) as count
       FROM progress
       WHERE user_id = ?
       AND completed_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
       GROUP BY DATE(completed_at)
       ORDER BY day ASC`,
      [req.user.id]
    );

    // 4. WEEKLY STREAK
    // Get all unique days the user worked out, ordered newest first, calculate the streak in JavaScript below
    const [streakData] = await pool.query(
      `SELECT DISTINCT DATE(completed_at) as day
       FROM progress
       WHERE user_id = ?
       ORDER BY day DESC`,
      [req.user.id]
    );

    // Calculate streak:
    // Start from today, go backwards day by day
    // Count consecutive days that have a workout logged
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to midnight

    // Convert DB dates to a Set of date strings for O(1) lookup, e.g. Set { '2026-04-03', '2026-04-02', '2026-04-01' }
    const workedOutDays = new Set(
      streakData.map(row => new Date(row.day).toISOString().split('T')[0])
    );

    // Walk backwards from today checking each day
    const checkDate = new Date(today);
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (workedOutDays.has(dateStr)) {
        streak++; // this day had a workout → extend streak
        checkDate.setDate(checkDate.getDate() - 1); // go back one day
      } else {
        break; // no workout this day → streak ends
      }
    }

    return res.status(200).json({
      success: true,
      stats: {
        total,        // total workouts completed all time
        streak,       // current daily streak
        history,      // last 20 completions with names and dates
        weeklyData,   // per-day counts for last 7 days
      }
    });

  } catch (err) {
    console.error('Stats error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;