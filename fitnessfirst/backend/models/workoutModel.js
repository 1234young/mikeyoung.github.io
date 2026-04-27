import pool from '../db.js';

// Get all workouts
export const getAllWorkouts = async () => {
  const [rows] = await pool.query("SELECT * FROM workouts ORDER BY created_at DESC");
  return rows;
};

// Create a new workout
export const createWorkout = async (name, description) => {
  return pool.query("INSERT INTO workouts (name, description) VALUES (?, ?)", [name, description]);
};

// Delete a workout
export const removeWorkout = async (id) => {
  return pool.query("DELETE FROM workouts WHERE id = ?", [id]);
};
