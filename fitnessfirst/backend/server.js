import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import workoutRoutes from './routes/workouts.js';
import youtubeRoutes from './routes/youtube.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use((_req, res, next) => {
  res.setHeader('Permissions-Policy', 'compute-pressure=()');
  next();
});

// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/youtube', youtubeRoutes);

// Health check 
app.get('/api/health', (_req, res) => {
  res.json({ status: 'Server is running' });
});

// Global error handler 
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});