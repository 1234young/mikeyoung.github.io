import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate all fields are present
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and message are required.'
    });
  }

  try {
    await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully!'
    });

  } catch (err) {
    console.error('Contact error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
});

export default router;