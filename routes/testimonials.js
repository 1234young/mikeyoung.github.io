import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// HELPER — requireAuth
// Verifies JWT token for protected routes
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Session expired.' });
  }
}


// GET /api/testimonials
// Returns all APPROVED testimonials for homepage, No auth required — public route
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, first_name, last_name, rating, review, created_at
       FROM testimonials
       WHERE approved = 1
       ORDER BY created_at DESC`
    );
    return res.status(200).json({ success: true, testimonials: rows });
  } catch (err) {
    console.error('Fetch testimonials error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// POST /api/testimonials
// Logged-in user submits a testimonial
// Saved with approved=0 until admin approves it
router.post('/', requireAuth, async (req, res) => {
  const { rating, review } = req.body;

  // Validate input
  if (!rating || !review) {
    return res.status(400).json({ success: false, message: 'Rating and review are required.' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5.' });
  }

  if (review.trim().length < 10) {
    return res.status(400).json({ success: false, message: 'Review must be at least 10 characters.' });
  }

  try {
    // Get user's name from DB using the id from JWT token
    const [users] = await pool.query(
      'SELECT first_name, last_name FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const { first_name, last_name } = users[0];

    // Check if user already submitted a testimonial
    // One testimonial per user to prevent spam
    const [existing] = await pool.query(
      'SELECT id FROM testimonials WHERE user_id = ?',
      [req.user.id]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'You have already submitted a testimonial.'
      });
    }

    // Insert testimonial — approved=0 by default 
    await pool.query(
      `INSERT INTO testimonials (user_id, first_name, last_name, rating, review)
       VALUES (?, ?, ?, ?, ?)`,
      [req.user.id, first_name, last_name, rating, review.trim()]
    );

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been submitted for approval.'
    });

  } catch (err) {
    console.error('Submit testimonial error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// PATCH /api/testimonials/:id/approve
// Admin approves a testimonial so it shows on homepage
router.patch('/:id/approve', requireAuth, async (req, res) => {
  try {
    // Verify the requesting user is admin
    const [users] = await pool.query(
      'SELECT role FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!users.length || users[0].role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required.' });
    }

    await pool.query(
      'UPDATE testimonials SET approved = 1 WHERE id = ?',
      [req.params.id]
    );

    return res.status(200).json({ success: true, message: 'Testimonial approved.' });
  } catch (err) {
    console.error('Approve testimonial error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;