import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET ALL WORKOUTS 
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM workouts ORDER BY created_at DESC'
    );

    const workouts = rows.map(workout => {
      let parsedSteps = [];
      if (workout.steps) {
        try {
          parsedSteps = JSON.parse(workout.steps);
        } catch (parseErr) {
          console.warn(`⚠️ Invalid steps JSON for workout id ${workout.id}:`, workout.steps);
          parsedSteps = [];
        }
      }
      return { ...workout, steps: parsedSteps };
    });

    return res.status(200).json({ success: true, workouts });

  } catch (err) {
    console.error('Get workouts error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to fetch workouts.' });
  }
});

// GET SINGLE WORKOUT
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM workouts WHERE id = ?', [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Workout not found.' });
    }

    let parsedSteps = [];
    if (rows[0].steps) {
      try {
        parsedSteps = JSON.parse(rows[0].steps);
      } catch (parseErr) {
        console.warn(`⚠️ Invalid steps JSON for workout id ${id}`);
        parsedSteps = [];
      }
    }

    const workout = { ...rows[0], steps: parsedSteps };
    return res.status(200).json({ success: true, workout });

  } catch (err) {
    console.error('Get workout error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to fetch workout.' });
  }
});

// CREATE WORKOUT 
router.post('/', async (req, res) => {
  const { name, description, significance, steps, video } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Workout name is required.' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO workouts (name, description, significance, steps, video) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        description || null,
        significance || null,
        steps ? JSON.stringify(steps) : null,
        video || null
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Workout created.',
      workoutId: result.insertId
    });

  } catch (err) {
    console.error('Create workout error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to create workout.' });
  }
});

//  UPDATE WORKOUT 
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, significance, steps, video } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Workout name is required.' });
  }

  try {
    const [result] = await pool.query(
      `UPDATE workouts 
       SET name = ?, description = ?, significance = ?, steps = ?, video = ? 
       WHERE id = ?`,
      [
        name,
        description || null,
        significance || null,
        steps ? JSON.stringify(steps) : null,
        video || null,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Workout not found.' });
    }

    return res.status(200).json({ success: true, message: 'Workout updated.' });

  } catch (err) {
    console.error('Update workout error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to update workout.' });
  }
});

//  DELETE WORKOUT 
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM workouts WHERE id = ?', [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Workout not found.' });
    }

    return res.status(200).json({ success: true, message: 'Workout deleted.' });

  } catch (err) {
    console.error('Delete workout error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to delete workout.' });
  }
});

// SAVE VIDEO URL TO WORKOUT  
// Called automatically after a successful YouTube search so the same workout is never searched twice
router.patch('/:id/video', async (req, res) => {
  const { id } = req.params;
  const { video } = req.body;

  if (!video) {
    return res.status(400).json({ success: false, message: 'Video URL is required.' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE workouts SET video = ? WHERE id = ?',
      [video, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Workout not found.' });
    }

    return res.status(200).json({ success: true, message: 'Video URL saved.' });

  } catch (err) {
    console.error('Save video URL error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to save video URL.' });
  }
});

export default router;