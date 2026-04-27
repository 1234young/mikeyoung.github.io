import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();


// MIDDLEWARE — requireAdmin
// Runs before every admin route
// 1. Verifies JWT token
// 2. Checks user role is 'admin'
// If either check fails → request is blocked with an error response
async function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB to check their role, don't trust the token payload for role —
    // role could have changed since token was issued
    const [rows] = await pool.query(
      'SELECT id, role FROM users WHERE id = ?',
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Block non-admin users even if they have a valid token
    if (rows[0].role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required.' });
      // 403 = Forbidden — authenticated but not authorized
    }

    req.user = decoded;
    next(); // admin confirmed → proceed to route handler
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Session expired.' });
  }
}

// Apply admin middleware to ALL routes in this file
router.use(requireAdmin);


// GET /api/admin/stats
// Returns overview numbers for the dashboard
router.get('/stats', async (req, res) => {
  try {
    // Run all count queries in parallel using Promise.all
    // Much faster than running them one after another
    const [
      [[{ totalUsers }]],
      [[{ totalWorkouts }]],
      [[{ totalCompletions }]],
      [[{ totalFavourites }]],
    ] = await Promise.all([
      pool.query('SELECT COUNT(*) as totalUsers FROM users'),
      pool.query('SELECT COUNT(*) as totalWorkouts FROM workouts'),
      pool.query('SELECT COUNT(*) as totalCompletions FROM progress'),
      pool.query('SELECT COUNT(*) as totalFavourites FROM favourites'),
    ]);

    return res.status(200).json({
      success: true,
      stats: { totalUsers, totalWorkouts, totalCompletions, totalFavourites }
    });
  } catch (err) {
    console.error('Admin stats error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// GET /api/admin/users
// Returns all registered users for management
router.get('/users', async (req, res) => {
  try {
    // Never select password — even for admins
    const [users] = await pool.query(
      `SELECT id, first_name, last_name, email, phone, role, created_at
       FROM users
       ORDER BY created_at DESC`
    );

    return res.status(200).json({ success: true, users });
  } catch (err) {
    console.error('Admin users error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// GET /api/admin/workouts
// Returns all workouts for management
router.get('/workouts', async (req, res) => {
  try {
    const [workouts] = await pool.query(
      'SELECT * FROM workouts ORDER BY created_at DESC'
    );
    return res.status(200).json({ success: true, workouts });
  } catch (err) {
    console.error('Admin workouts error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// POST /api/admin/workouts
// Adds a new workout
router.post('/workouts', async (req, res) => {
  const { name, description, significance, video, category, steps } = req.body;

  if (!name || !category) {
    return res.status(400).json({ success: false, message: 'Name and category are required.' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO workouts (name, description, significance, video, category, steps)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description || null, significance || null,
       video || null, category, steps || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Workout added.',
      workoutId: result.insertId
    });
  } catch (err) {
    console.error('Add workout error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/admin/testimonials — all pending testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, first_name, last_name, rating, review, created_at, approved
       FROM testimonials
       ORDER BY created_at DESC`
    );
    return res.status(200).json({ success: true, testimonials: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// PATCH /api/admin/testimonials/:id — approve or reject
router.patch('/testimonials/:id', async (req, res) => {
  const { approved } = req.body; // 1 = approve, 0 = reject
  try {
    await pool.query(
      'UPDATE testimonials SET approved = ? WHERE id = ?',
      [approved, req.params.id]
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// PUT /api/admin/workouts/:id
// Updates an existing workout
router.put('/workouts/:id', async (req, res) => {
  const workoutId = parseInt(req.params.id);
  const { name, description, significance, video, category, steps } = req.body;

  if (!name || !category) {
    return res.status(400).json({ success: false, message: 'Name and category are required.' });
  }

  try {
    await pool.query(
      `UPDATE workouts
       SET name=?, description=?, significance=?, video=?, category=?, steps=?
       WHERE id=?`,
      [name, description || null, significance || null,
       video || null, category, steps || null, workoutId]
    );

    return res.status(200).json({ success: true, message: 'Workout updated.' });
  } catch (err) {
    console.error('Update workout error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// DELETE /api/admin/workouts/:id
// Deletes a workout, Also deletes related progress + favourites
// automatically via ON DELETE CASCADE in DB
router.delete('/workouts/:id', async (req, res) => {
  const workoutId = parseInt(req.params.id);

  try {
    await pool.query('DELETE FROM workouts WHERE id = ?', [workoutId]);
    return res.status(200).json({ success: true, message: 'Workout deleted.' });
  } catch (err) {
    console.error('Delete workout error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// GET /api/admin/completions
// Returns all workout completions with user + workout names
router.get('/completions', async (req, res) => {
  try {
    const [completions] = await pool.query(
      `SELECT p.id, p.completed_at,
              u.first_name, u.last_name, u.email,
              w.name as workout_name, w.category
       FROM progress p
       JOIN users u ON p.user_id = u.id
       JOIN workouts w ON p.workout_id = w.id
       ORDER BY p.completed_at DESC
       LIMIT 50`
    );

    return res.status(200).json({ success: true, completions });
  } catch (err) {
    console.error('Admin completions error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/admin/blog — all posts for admin management
router.get('/blog', async (req, res) => {
  try {
    const [posts] = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    return res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error('Get blog error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// POST /api/admin/blog — create a new post
router.post('/blog', async (req, res) => {
  const { title, content, category, cover_image, author } = req.body;
  if (!title || !content)
    return res.status(400).json({ success: false, message: 'Title and content are required.' });
  try {
    const [result] = await pool.query(
      'INSERT INTO blog_posts (title, content, category, cover_image, author) VALUES (?, ?, ?, ?, ?)',
      [title, content, category || 'General', cover_image || null, author || 'FitnessFirst Team']
    );
    return res.status(201).json({ success: true, message: 'Post created.', postId: result.insertId });
  } catch (err) {
    console.error('Create post error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// PUT /api/admin/blog/:id — update a post
router.put('/blog/:id', async (req, res) => {
  const { title, content, category, cover_image, author } = req.body;
  if (!title || !content)
    return res.status(400).json({ success: false, message: 'Title and content are required.' });
  try {
    await pool.query(
      'UPDATE blog_posts SET title=?, content=?, category=?, cover_image=?, author=? WHERE id=?',
      [title, content, category || 'General', cover_image || null, author || 'FitnessFirst Team', req.params.id]
    );
    return res.status(200).json({ success: true, message: 'Post updated.' });
  } catch (err) {
    console.error('Update post error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// DELETE /api/admin/blog/:id — delete a post
router.delete('/blog/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM blog_posts WHERE id = ?', [req.params.id]);
    return res.status(200).json({ success: true, message: 'Post deleted.' });
  } catch (err) {
    console.error('Delete post error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;