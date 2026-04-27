import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  try {
    req.user = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Session expired.' });
  }
}

async function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
    const [rows] = await pool.query('SELECT role FROM users WHERE id = ?', [decoded.id]);
    if (!rows.length || rows[0].role !== 'admin')
      return res.status(403).json({ success: false, message: 'Admin access required.' });
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Session expired.' });
  }
}

// ── 1. FIXED ROUTES FIRST (no :id param) ────────────────────────────────────

// POST /api/bookings — user submits a new booking
router.post('/', requireAuth, async (req, res) => {
  const { name, email, trainer, message } = req.body;
  if (!name || !email || !trainer || !message)
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  try {
    await pool.query(
      'INSERT INTO bookings (user_id, name, email, trainer, message) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, name, email, trainer, message]
    );
    return res.status(201).json({ success: true, message: 'Booking submitted successfully!' });
  } catch (err) {
    console.error('Booking error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/bookings/mine — logged-in user fetches only their own bookings
// ⚠️ MUST be before /:id routes — otherwise Express matches "mine" as an id
router.get('/mine', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    return res.status(200).json({ success: true, bookings: rows });
  } catch (err) {
    console.error('Get my bookings error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/bookings — admin fetches all bookings
router.get('/', requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
    return res.status(200).json({ success: true, bookings: rows });
  } catch (err) {
    console.error('Get bookings error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ── 2. PARAM ROUTES AFTER (:id must come last) ───────────────────────────────

// PATCH /api/bookings/:id — admin updates booking status
router.patch('/:id', requireAdmin, async (req, res) => {
  const { status } = req.body;
  if (!['approved', 'rejected', 'pending'].includes(status))
    return res.status(400).json({ success: false, message: 'Invalid status.' });
  try {
    await pool.query('UPDATE bookings SET status = ? WHERE id = ?', [status, req.params.id]);
    return res.status(200).json({ success: true, message: `Booking ${status}.` });
  } catch (err) {
    console.error('Update booking error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// PATCH /api/bookings/:id/reschedule — user reschedules their own booking
router.patch('/:id/reschedule', requireAuth, async (req, res) => {
  const { message } = req.body;
  if (!message)
    return res.status(400).json({ success: false, message: 'Message is required.' });
  try {
    const [result] = await pool.query(
      'UPDATE bookings SET message = ?, status = ? WHERE id = ? AND user_id = ?',
[message, 'pending', req.params.id, req.user.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    return res.status(200).json({ success: true, message: 'Booking rescheduled.' });
  } catch (err) {
    console.error('Reschedule error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// DELETE /api/bookings/:id/cancel — user cancels their own booking
router.delete('/:id/cancel', requireAuth, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM bookings WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    return res.status(200).json({ success: true, message: 'Booking cancelled.' });
  } catch (err) {
    console.error('Cancel error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// DELETE /api/bookings/:id — admin deletes a booking
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM bookings WHERE id = ?', [req.params.id]);
    return res.status(200).json({ success: true, message: 'Booking deleted.' });
  } catch (err) {
    console.error('Delete booking error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;