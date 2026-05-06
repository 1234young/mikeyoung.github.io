import express from 'express';
import jwt     from 'jsonwebtoken';
import pool    from '../db.js';
// Remove dependency risk — use built-in fetch if available
import fetchPkg from 'node-fetch';

const fetch = globalThis.fetch || fetchPkg;

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

// GET /api/nutrition/today
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

// GET /api/nutrition/weekly
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

// GET /api/nutrition/search?q=...
router.get('/search', requireAuth, async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ success: false, message: 'Query is required.' });
  }

  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q)}&search_simple=1&action=process&json=1&page_size=6`
    );

    // 🔥 Prevent crash if API fails
    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();

    const items = (data.products || [])
      .map(p => ({
        name: p.product_name || 'Unknown',
        calories: Math.round(p?.nutriments?.['energy-kcal_100g'] || 0),
        protein: Number(p?.nutriments?.proteins_100g || 0),
        carbs: Number(p?.nutriments?.carbohydrates_100g || 0),
        fats: Number(p?.nutriments?.fat_100g || 0),
      }))
      .filter(p => p.name && p.name !== 'Unknown');

    return res.json({ success: true, items });

  } catch (err) {
    console.error('Food search proxy error:', err.message);
    return res.status(500).json({ success: false, message: 'Food search failed.' });
  }
});

// POST /api/nutrition
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

// DELETE /api/nutrition/:id
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

// GET /api/nutrition/goals
router.get('/goals', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM nutrition_goals WHERE user_id = ?',
      [req.user.id]
    );

    const goals = rows[0] || {
      calorie_goal: 2000,
      protein_goal: 150,
      carbs_goal: 250,
      fats_goal: 65,
    };

    return res.json({ success: true, goals });
  } catch (err) {
    console.error('Get goals error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// POST /api/nutrition/goals
router.post('/goals', requireAuth, async (req, res) => {
  const { calorie_goal, protein_goal, carbs_goal, fats_goal } = req.body;

  try {
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