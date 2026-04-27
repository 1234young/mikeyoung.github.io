import 'dotenv/config';
import express        from 'express';
import cors           from 'cors';
import helmet         from 'helmet';
import compression    from 'compression';
import rateLimit      from 'express-rate-limit';

import authRoutes        from './routes/auth.js';
import contactRoutes     from './routes/contact.js';
import favouriteRoutes   from './routes/favourites.js';
import adminRoutes       from './routes/admin.js';
import progressRoutes    from './routes/progress.js';
import testimonialRoutes from './routes/testimonials.js';
import workoutRoutes     from './routes/workouts.js';
import youtubeRoutes     from './routes/youtube.js';
import bookingsRoutes    from './routes/bookings.js';
import uploadRoutes      from './routes/upload.js';
import blogRoutes        from './routes/blog.js';
import logsRoutes        from './routes/logs.js';
import nutritionRoutes from './routes/nutrition.js';


const app  = express();
const PORT = process.env.PORT || 5000;

//  SECURITY — Helmet sets safe HTTP headers in one line 
// Protects against common attacks: clickjacking, XSS, sniffing etc.
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // needed for Cloudinary images
}));

// Force HTTPS in production — redirects any http:// request to https://
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

//  COMPRESSION — shrinks all responses before sending to clients
// Reduces JSON/HTML response size by ~70%, faster on slow connections.
// threshold: 1kb — only compress responses larger than 1kb (no point compressing tiny ones)
app.use(compression({ threshold: 1024 }));

//  CORS CONFIG — only allow requests from  frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL, // set this in .env when you deploy to Vercel
].filter(Boolean); // removes undefined if FRONTEND_URL is not set yet

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '10kb' })); // reject oversized JSON payloads

//  RATE LIMITING 
// Prevents any single user from hammering the server with too many requests.
// General limiter — applies to all routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  max:      100,             // max 100 requests per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders:   false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

// Strict limiter for auth routes — prevents brute force password attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  max:      10,              // max 10 login/register attempts per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders:   false,
  message: { success: false, message: 'Too many attempts. Please wait 15 minutes.' },
});

// Upload limiter — file uploads are expensive, limit to 20 per hour
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max:      20,
  message: { success: false, message: 'Upload limit reached. Try again in an hour.' },
});

app.use(generalLimiter); // apply general limiter to everything

// PERMISSIONS POLICY HEADER — controls which powerful browser features are allowed
//  only use "compute-pressure" for monitoring server load in the admin dashboard,
app.use((_req, res, next) => {
  res.setHeader('Permissions-Policy', 'compute-pressure=()');
  next();
});

//  ROUTES 
app.use('/api/auth',         authLimiter,   authRoutes);       // strict limit on login/register
app.use('/api/upload',       uploadLimiter, uploadRoutes);     // limit file uploads
app.use('/api/bookings',                    bookingsRoutes);
app.use('/api/workouts',                    workoutRoutes);
app.use('/api/youtube',                     youtubeRoutes);
app.use('/api/contact',                     contactRoutes);
app.use('/api/favourites',                  favouriteRoutes);
app.use('/api/progress',                    progressRoutes);
app.use('/api/admin',                       adminRoutes);
app.use('/api/testimonials',                testimonialRoutes);
app.use('/api/blog',                        blogRoutes);
app.use('/api/logs',                        logsRoutes);
app.use('/api/nutrition',                   nutritionRoutes);

//  HEALTH CHECK 
// Render.com pings this every 30s to keep the server awake on the free tier.
// Also useful to confirm the server is running after deployment.
app.get('/api/health', (_req, res) => {
  res.json({
    status:    'ok',
    timestamp: new Date().toISOString(),
    database:  process.env.DB_MODE === 'cloud' ? 'aiven' : 'local',
  });
});

//  404 HANDLER — catches requests to undefined routes 
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

//  GLOBAL ERROR HANDLER 
// Catches any unhandled errors thrown inside route handlers.
// Without this, Express would crash the server on unexpected errors.
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});