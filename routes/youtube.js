import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

//  Shared helper
async function searchYouTube(query, apiKey) {
  const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
  searchUrl.searchParams.set('part',             'snippet');
  searchUrl.searchParams.set('q',                `${query} workout tutorial`);
  searchUrl.searchParams.set('type',             'video');
  searchUrl.searchParams.set('maxResults',       '1');
  searchUrl.searchParams.set('videoEmbeddable',  'true');
  searchUrl.searchParams.set('relevanceLanguage','en');
  searchUrl.searchParams.set('key',              apiKey);

  const response = await fetch(searchUrl.toString());
  const data     = await response.json();

  if (data.error)                              throw new Error(data.error.message);
  if (!data.items || data.items.length === 0)  return null;

  const video = data.items[0];
  return {
    videoId:   video.id.videoId,
    title:     video.snippet.title,
    channel:   video.snippet.channelTitle,
    thumbnail: video.snippet.thumbnails.medium.url,
    embedUrl:  `https://www.youtube.com/embed/${video.id.videoId}`,
  };
}

//  SINGLE SEARCH — search YouTube for one workout
router.get('/search', requireAuth, async (req, res) => {
  const { q }    = req.query;
  const apiKey   = process.env.YOUTUBE_API_KEY;

  if (!q) {
    return res.status(400).json({ success: false, message: 'Query is required.' });
  }

  if (!apiKey) {
    return res.status(500).json({ success: false, message: 'YouTube API key not configured.' });
  }

  try {
    const video = await searchYouTube(q, apiKey);

    if (!video) {
      return res.status(404).json({ success: false, message: 'No video found.' });
    }

    return res.status(200).json({ success: true, video });

  } catch (err) {
    console.error('YouTube search error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to fetch YouTube video.' });
  }
});

//  BATCH SEARCH — all missing videos in one request 
router.post('/batch-search', requireAuth, async (req, res) => {
  const { workouts } = req.body;
  const apiKey       = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ success: false, message: 'YouTube API key not configured.' });
  }

  if (!workouts || workouts.length === 0) {
    return res.status(400).json({ success: false, message: 'No workouts provided.' });
  }

  try {
    // Fire all searches simultaneously
    const results = await Promise.all(
      workouts.map(async (workout) => {
        try {
          const video = await searchYouTube(workout.name, apiKey);
          return { id: workout.id, video };
        } catch {
          return { id: workout.id, video: null };
        }
      })
    );

    return res.status(200).json({ success: true, results });

  } catch (err) {
    console.error('Batch search error:', err.message);
    return res.status(500).json({ success: false, message: 'Batch search failed.' });
  }
});

export default router;