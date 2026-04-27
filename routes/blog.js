import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /api/blog — public, no auth required, for the homepage section
router.get('/', async (req, res) => {
  try {
    const [posts] = await pool.query(
      'SELECT * FROM blog_posts ORDER BY created_at DESC LIMIT 6'
    );
    return res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error('Blog fetch error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;