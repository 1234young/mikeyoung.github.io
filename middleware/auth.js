import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  // Every HTTP request carries "headers" — key/value metadata sent by the browser.
  // The Authorization header holds the token in this exact format: "Bearer eyJhbG..."
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated. Please log in.',
    });
  }

  // "Bearer eyJhbGciOiJIUzI1NiJ9.xxxx.yyyy" -we only want the actual token part, so split by space and take index 1
  const token = authHeader.split(' ')[1];

  try {
    // jwt.verify() does two things at once:
    //   1. Checks the token's signature using JWT_SECRET — if anyone tampered
    //      with the token, the signature won't match and it throws immediately.
    //   2. Decodes the payload ({ id, email, iat, exp }) and returns it.
    // We store that decoded payload on req.user so any route handler that runs
    // after this middleware can read req.user.id, req.user.email, etc.
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    // next() hands control to the actual route handler (e.g. GET /api/workouts).
    next();
  } catch (err) {
    // jwt.verify() throws if the token is expired, malformed, or signed with the wrong secret. All those cases mean "not trusted" → reject with 401.
    console.error('JWT verify error:', err.message);
    return res.status(401).json({
      success: false,
      message: 'Session expired. Please log in again.',
    });
  }
}