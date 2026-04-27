import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// MIDDLEWARE — requireAuth, Runs BEFORE every route in this file
// Extracts and verifies the JWT token
// Attaches the decoded user id to req.user,so every route below can use req.user.id to know which user is making the request
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  // Reject if no token provided
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token signature and decode payload
    // If token is expired or tampered → throws error → caught below
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next(); // token is valid → proceed to the actual route handler
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
  }
}

// Apply requireAuth to ALL routes in this file
router.use(requireAuth);


// GET /api/favourites
// Returns all favourited workout IDs for the logged-in user
// Frontend uses this to know which hearts to show as filled
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      // Only fetch workout_id — just need to know which workouts are favourited
      'SELECT workout_id FROM favourites WHERE user_id = ?',
      [req.user.id] // req.user.id comes from the JWT token via requireAuth above
    );

    // Return an array of just the IDs e.g. [1, 5, 12, 27]
    // This is cleaner than returning full objects for this use case
    const favouriteIds = rows.map(row => row.workout_id);

    return res.status(200).json({ success: true, favourites: favouriteIds });

  } catch (err) {
    console.error('Get favourites error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// POST /api/favourites/:workoutId
// Adds a workout to the logged-in user's favourites:workoutId is a URL parameter e.g. /api/favourites/12

router.post('/:workoutId', async (req, res) => {
  // req.params.workoutId extracts the number from the URL
  // parseInt converts it from string to number for the DB query
  const workoutId = parseInt(req.params.workoutId);

  if (!workoutId) {
    return res.status(400).json({ success: false, message: 'Invalid workout ID.' });
  }

  try {
    // INSERT IGNORE — if this combination already exists (duplicate),
    // MySQL silently ignores it instead of throwing an error
    await pool.query(
      'INSERT IGNORE INTO favourites (user_id, workout_id) VALUES (?, ?)',
      [req.user.id, workoutId]
    );

    return res.status(201).json({ success: true, message: 'Added to favourites.' });

  } catch (err) {
    console.error('Add favourite error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// DELETE /api/favourites/:workoutId
// Removes a workout from the logged-in user's favourites
router.delete('/:workoutId', async (req, res) => {
  const workoutId = parseInt(req.params.workoutId);

  if (!workoutId) {
    return res.status(400).json({ success: false, message: 'Invalid workout ID.' });
  }

  try {
    // Delete only THIS user's favourite for THIS workout
    // The WHERE clause on BOTH user_id AND workout_id is critical
    await pool.query(
      'DELETE FROM favourites WHERE user_id = ? AND workout_id = ?',
      [req.user.id, workoutId]
    );

    return res.status(200).json({ success: true, message: 'Removed from favourites.' });

  } catch (err) {
    console.error('Remove favourite error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;