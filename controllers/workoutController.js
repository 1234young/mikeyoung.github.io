import { getAllWorkouts, createWorkout, removeWorkout } from '../models/workoutModel.js';

// Fetch all workouts
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await getAllWorkouts();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching workouts" });
  }
};

// Add a new workout
export const addWorkout = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ success: false, message: "Name is required" });

  try {
    await createWorkout(name, description);
    res.json({ success: true, message: "Workout added" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding workout" });
  }
};

// Delete a workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    await removeWorkout(id);
    res.json({ success: true, message: "Workout deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting workout" });
  }
};
