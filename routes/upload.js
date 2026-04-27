import express          from 'express';
import jwt              from 'jsonwebtoken';
import multer           from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary       from '../utils/cloudinary.js';
import pool             from '../db.js';

const router = express.Router();

// ── Auth middleware ───────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  try {
    req.user = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Session expired.' });
  }
}

// ── Multer storage for avatars ────────────────────────────────────────────────
// Each upload goes to a dedicated Cloudinary folder.
// transformation resizes to 300x300 and crops to face for clean avatars.
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:         'fitnessfirst/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 300, height: 300, crop: 'fill', gravity: 'face' }],
  },
});

// ── Multer storage for progress photos ───────────────────────────────────────
const progressStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:          'fitnessfirst/progress',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation:  [{ width: 800, height: 800, crop: 'limit' }], // max 800px, keeps aspect ratio
  },
});

// file size limit — 5MB max per upload
const fileSizeLimit = { fileSize: 5 * 1024 * 1024 };

const uploadAvatar   = multer({ storage: avatarStorage,   limits: fileSizeLimit });
const uploadProgress = multer({ storage: progressStorage, limits: fileSizeLimit });


// POST /api/upload/avatar
// Uploads a new profile picture and saves the URL to the users table
router.post('/avatar', requireAuth, uploadAvatar.single('avatar'), async (req, res) => {
  // req.file is populated by multer after a successful Cloudinary upload
  if (!req.file)
    return res.status(400).json({ success: false, message: 'No file uploaded.' });

  try {
    const imageUrl = req.file.path; // Cloudinary returns the full URL in req.file.path

    // Save the new avatar URL to the user's row
    await pool.query('UPDATE users SET avatar_url = ? WHERE id = ?', [imageUrl, req.user.id]);

    return res.status(200).json({ success: true, avatarUrl: imageUrl });
  } catch (err) {
    console.error('Avatar upload error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// POST /api/upload/progress-photo
// Uploads a progress photo and saves it to progress_photos table
router.post('/progress-photo', requireAuth, uploadProgress.single('photo'), async (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, message: 'No file uploaded.' });

  const caption = req.body.caption || null;

  try {
    const imageUrl = req.file.path;

    await pool.query(
      'INSERT INTO progress_photos (user_id, image_url, caption) VALUES (?, ?, ?)',
      [req.user.id, imageUrl, caption]
    );

    return res.status(201).json({ success: true, imageUrl, caption });
  } catch (err) {
    console.error('Progress photo upload error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// GET /api/upload/progress-photos
// Returns all progress photos for the logged-in user
router.get('/progress-photos', requireAuth, async (req, res) => {
  try {
    const [photos] = await pool.query(
      'SELECT * FROM progress_photos WHERE user_id = ? ORDER BY uploaded_at DESC',
      [req.user.id]
    );
    return res.status(200).json({ success: true, photos });
  } catch (err) {
    console.error('Fetch photos error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// DELETE /api/upload/progress-photos/:id
// Deletes a progress photo from DB and from Cloudinary
router.delete('/progress-photos/:id', requireAuth, async (req, res) => {
  try {
    // Fetch the photo first to get the Cloudinary URL for deletion
    const [[photo]] = await pool.query(
      'SELECT * FROM progress_photos WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (!photo)
      return res.status(404).json({ success: false, message: 'Photo not found.' });

    // Extract the Cloudinary public_id from the URL so we can delete it from storage.
    // URL format: https://res.cloudinary.com/<cloud>/image/upload/v123/<folder>/<public_id>.jpg
    // We split on '/upload/' and take the part after it, then strip the extension.
    const urlParts  = photo.image_url.split('/upload/');
    const publicId  = urlParts[1].replace(/^v\d+\//, '').replace(/\.[^.]+$/, '');

    // Delete from Cloudinary storage
    await cloudinary.uploader.destroy(publicId);

    // Delete from database
    await pool.query('DELETE FROM progress_photos WHERE id = ?', [req.params.id]);

    return res.status(200).json({ success: true, message: 'Photo deleted.' });
  } catch (err) {
    console.error('Delete photo error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;