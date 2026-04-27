import express from 'express';
import jwt     from 'jsonwebtoken';
import pool    from '../db.js';

const router = express.Router();

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  try {
    req.user = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Session expired.' });
  }
}

// GET /api/nutrition/today — meals logged today
router.get('/today', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM nutrition_logs
       WHERE user_id = ? AND DATE(logged_at) = CURDATE()
       ORDER BY logged_at ASC`,
      [req.user.id]
    );
    return res.json({ success: true, meals: rows });
  } catch (err) {
    console.error('Nutrition today error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/nutrition/weekly — last 7 days calorie totals for chart
router.get('/weekly', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT DATE(logged_at) AS day,
              ROUND(SUM(calories), 1) AS total_calories,
              ROUND(SUM(protein),  1) AS total_protein,
              ROUND(SUM(carbs),    1) AS total_carbs,
              ROUND(SUM(fats),     1) AS total_fats
       FROM nutrition_logs
       WHERE user_id = ?
         AND logged_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
       GROUP BY DATE(logged_at)`,
      [req.user.id]
    );
    return res.json({ success: true, weekly: rows });
  } catch (err) {
    console.error('Nutrition weekly error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// POST /api/nutrition — log a meal
router.post('/', requireAuth, async (req, res) => {
  const { meal_name, calories, protein, carbs, fats } = req.body;
  if (!meal_name)
    return res.status(400).json({ success: false, message: 'Meal name is required.' });
  try {
    const [result] = await pool.query(
      `INSERT INTO nutrition_logs (user_id, meal_name, calories, protein, carbs, fats)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, meal_name, calories || 0, protein || 0, carbs || 0, fats || 0]
    );
    return res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    console.error('Log meal error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// DELETE /api/nutrition/:id — delete a meal
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM nutrition_logs WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Meal not found.' });
    return res.json({ success: true });
  } catch (err) {
    console.error('Delete meal error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/nutrition/goals — fetch user's daily goals
router.get('/goals', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM nutrition_goals WHERE user_id = ?',
      [req.user.id]
    );
    // Return defaults if user hasn't set goals yet
    const goals = rows[0] || {
      calorie_goal: 2000, protein_goal: 150,
      carbs_goal: 250,    fats_goal: 65,
    };
    return res.json({ success: true, goals });
  } catch (err) {
    console.error('Get goals error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// POST /api/nutrition/goals — save or update user's daily goals
router.post('/goals', requireAuth, async (req, res) => {
  const { calorie_goal, protein_goal, carbs_goal, fats_goal } = req.body;
  try {
    // INSERT OR UPDATE — one row per user
    await pool.query(
      `INSERT INTO nutrition_goals (user_id, calorie_goal, protein_goal, carbs_goal, fats_goal)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         calorie_goal = VALUES(calorie_goal),
         protein_goal = VALUES(protein_goal),
         carbs_goal   = VALUES(carbs_goal),
         fats_goal    = VALUES(fats_goal)`,
      [req.user.id, calorie_goal, protein_goal, carbs_goal, fats_goal]
    );
    return res.json({ success: true, message: 'Goals saved.' });
  } catch (err) {
    console.error('Save goals error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;