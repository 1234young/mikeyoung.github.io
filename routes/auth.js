import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

// express.Router() creates a mini app that handles only auth-related routes
// It gets mounted in server.js under '/api/auth'
// So router.post('/login') becomes '/api/auth/login' in the full app
const router = express.Router();

// REGISTER — POST /api/auth/register
// Creates a new user account in the database
router.post('/register', async (req, res) => {

  // Destructure all fields from the request body
  // req.body is the JSON object the frontend sent via fetch()
  const { firstName, lastName, phone, email, password, role } = req.body;

  // If the user sends anything else (e.g. 'superuser'), we default to 'trainee'
  // This prevents users from assigning themselves unexpected roles
  const allowedRoles = ['trainee', 'trainer', 'admin'];
  const userRole = allowedRoles.includes(role) ? role : 'trainee';

  // Validate required fields before touching the database
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'First name, last name, email and password are required.'
    });
  }

  try {
    // Check if this email is already in the database
    // We only SELECT id because we don't need any other fields, we just need to know if a row exists
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ?', [email]
    );

    // existing is an array — if length > 0, email is already registered
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Email already registered.' });
      // 409 = Conflict — the resource (email) already exists
    }

    // Hash the password before storing it
    // NEVER store plain text passwords in a database
    // bcrypt.hash(password, 10) — 10 is the "salt rounds"
    // Higher salt rounds = more secure but slower. 10 is the industry standard
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    // We use ? placeholders (parameterized query) to prevent SQL injection attacks
    const [result] = await pool.query(
      `INSERT INTO users (email, first_name, last_name, phone, password, role)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [email, firstName, lastName, phone || null, hashedPassword, userRole]
    );

    // result.insertId is the auto-incremented id of the newly created row
    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      userId: result.insertId
      // 201 = Created — standard HTTP status for successful resource creation
    });

  } catch (err) {
    // Catches unexpected database errors (e.g. connection lost, duplicate key)
    console.error('Register error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// LOGIN — POST /api/auth/login
// Verifies credentials and returns a JWT token and user data if successful
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    // Fetch the user row that matches this email
    // Include password so we can verify it with bcrypt below
    const [rows] = await pool.query(
      'SELECT id, email, first_name, last_name, phone, password, role, created_at FROM users WHERE email = ?',
      [email]
    );

    // rows is an array — if empty, no user with this email exists
    if (rows.length === 0) {
      // Return 404 with 'not-registered' so the frontend can show
      // the "Not a registered user. Click here to sign up." message
      return res.status(404).json({ success: false, message: 'not-registered' });
    }

    const user = rows[0];

    // bcrypt.compare() hashes the incoming password using the same salt
    // stored in user.password, then compares the two hashes
    // It returns true if they match, false if not
    // This is the only safe way to verify bcrypt passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password.' });
      // 401 = Unauthorized — credentials are wrong
    }

    // Create a JWT (JSON Web Token) — a signed token the frontend stores
    // and sends with every future request to prove the user is logged in
    // Payload: { id, email } — minimal data needed to identify the user
    // process.env.JWT_SECRET — the secret key used to sign the token, stored securely in .env file
    // expiresIn: '7d' — token expires after 7 days, user must log in again
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return the token and user data to the frontend
    // Frontend stores these in localStorage for future requests
    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id:          user.id,
        email:       user.email,
        firstName:   user.first_name,
        lastName:    user.last_name,
        phone:       user.phone,
        role:        user.role,
        memberSince: user.created_at
      }
    });

  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// PROFILE — GET /api/auth/profile
// Returns the logged-in user's data using their JWT token
router.get('/profile', async (req, res) => {

  // Every HTTP request carries headers — key/value metadata
  // Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.xxxx.yyyy"
  const authHeader = req.headers.authorization;

  // Reject the request if there's no token or wrong format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  }

  // Split "Bearer eyJ..." by space and take index [1] to get just the token
  const token = authHeader.split(' ')[1];

  try {
    // jwt.verify() does two things:
    // 1. Checks the token's signature using JWT_SECRET
    //    If anyone tampered with the token, the signature won't match, throws error
    // 2. Decodes the payload ({ id, email, iat, exp }) and returns it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch fresh user data from the database using the id from the token
    // always fetch fresh from DB in case user data changed since login
    const [rows] = await pool.query(
     'SELECT id, email, first_name, last_name, phone, role, created_at, avatar_url FROM users WHERE id = ?',
      [decoded.id]
    );

    // Edge case: token is valid but user was deleted from the database
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const user = rows[0];

    return res.status(200).json({
      success: true,
      user: {
        id:          user.id,
        email:       user.email,
        firstName:   user.first_name,
        lastName:    user.last_name,
        phone:       user.phone,
        role:        user.role,
        memberSince: user.created_at,
        avatarUrl:   user.avatar_url || null,
      }
    });

  } catch (err) {
    // jwt.verify() throws if the token is:
    // - Expired (past the 7 day limit)
    // - Tampered with (signature mismatch)
    // - Malformed (not a valid JWT format)
    // All these cases mean "not trusted", reject with 401
    console.error('Profile error:', err.message);
    return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
  }
});

export default router;