import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  try {
    req.user = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Session expired.' });
  }
}

// POST /api/logs/:workoutId
// Saves a single set for the logged-in user
router.post('/:workoutId', requireAuth, async (req, res) => {
  const { set_number, reps, weight } = req.body;
  const { workoutId } = req.params;

  if (!set_number || !reps) {
    return res.status(400).json({ success: false, message: 'set_number and reps are required.' });
  }

  try {
    await pool.query(
      'INSERT INTO workout_logs (user_id, workout_id, set_number, reps, weight) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, workoutId, set_number, reps, weight ?? 0]
    );
    return res.status(201).json({ success: true, message: 'Set logged.' });
  } catch (err) {
    console.error('Log set error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/logs/summary
// Returns all data the Progress page needs from workout_logs
router.get('/summary', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Total sets ever logged by this user
    const [[{ totalSets }]] = await pool.query(
      'SELECT COUNT(*) AS totalSets FROM workout_logs WHERE user_id = ?',
      [userId]
    );

    // Total volume = sum of (reps * weight) across all sets
    const [[{ totalVolume }]] = await pool.query(
      'SELECT COALESCE(SUM(reps * weight), 0) AS totalVolume FROM workout_logs WHERE user_id = ?',
      [userId]
    );

    // Last 10 logged sets with workout name joined in
    const [recentSets] = await pool.query(
      `SELECT wl.id, wl.set_number, wl.reps, wl.weight, wl.logged_at,
              w.name AS workout_name, w.category
       FROM workout_logs wl
       JOIN workouts w ON w.id = wl.workout_id
       WHERE wl.user_id = ?
       ORDER BY wl.logged_at DESC
       LIMIT 10`,
      [userId]
    );

    // Sets logged per day for the last 7 days (for the bar chart)
    const [weeklyData] = await pool.query(
      `SELECT DATE(logged_at) AS day, COUNT(*) AS count
       FROM workout_logs
       WHERE user_id = ? AND logged_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
       GROUP BY DATE(logged_at)`,
      [userId]
    );

    return res.json({ success: true, summary: { totalSets, totalVolume, recentSets, weeklyData } });
  } catch (err) {
    console.error('Summary error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;