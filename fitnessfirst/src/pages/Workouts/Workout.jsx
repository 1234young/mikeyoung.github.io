import { useEffect, useState } from "react";
import './Workout.css';

import strengthImg from '../../assets/strength.webp';
import fatLossImg  from '../../assets/fat-loss.webp';
import hiitImg     from '../../assets/hiit.webp';
import yogaImg     from '../../assets/yoga.webp';

// Section order and display config 
const SECTIONS = [
  { key: 'Strength Training', image: strengthImg, label: 'Strength Training', subtitle: 'Build muscle and increase overall strength'   },
  { key: 'Fat Loss',          image: fatLossImg,  label: 'Fat Loss',          subtitle: 'Burn calories and shed body fat'              },
  { key: 'HIIT',              image: hiitImg,     label: 'HIIT',              subtitle: 'High-intensity intervals for maximum results' },
  { key: 'Yoga & Recovery',   image: yogaImg,     label: 'Yoga & Recovery',   subtitle: 'Restore, stretch, and recover'               },
];

// Skeleton card 
function SkeletonCard() {
  return (
    <div className="workout-card skeleton">
      <div className="skeleton-title" />
      <div className="skeleton-line" />
      <div className="skeleton-line short" />
      <div className="skeleton-box" />
    </div>
  );
}

//  Video now just receives its URL — no individual fetching 
function WorkoutVideo({ workout, videoData }) {
  if (!videoData) {
    return <div className="video-placeholder shimmer">Finding video…</div>;
  }

  if (videoData.error) {
    return <div className="video-placeholder error">No video found for this workout.</div>;
  }

  return (
    <div className="workout-video">
      <iframe
        width="100%"
        height="215"
        src={videoData.embedUrl}
        title={videoData.title || workout.name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {videoData.channel && (
        <p className="video-credit">📺 {videoData.channel}</p>
      )}
    </div>
  );
}

//  Single workout card 
function WorkoutCard({ workout, videoData }) {
  return (
    <article className="workout-card">
      <div className="card-header">
        <h3 className="card-title">{workout.name}</h3>
        <span className="card-date">
          {new Date(workout.created_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
          })}
        </span>
      </div>

      {workout.significance && (
        <span className="significance-badge">{workout.significance}</span>
      )}

      {workout.description && (
        <p className="workout-description">{workout.description}</p>
      )}

      {workout.steps?.length > 0 && (
        <div className="workout-steps">
          <p className="steps-label">How to do it</p>
          <ol>
            {workout.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      <WorkoutVideo workout={workout} videoData={videoData} />
    </article>
  );
}

//  Main Workout page 
export default function Workout() {
  const [workouts, setWorkouts] = useState([]);
  const [videoMap, setVideoMap] = useState({});
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    const fetchEverything = async () => {
      try {
        // Step 1: fetch workouts from DB
        const res  = await fetch('/api/workouts');
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Failed to load workouts.');

        const fetchedWorkouts = data.workouts;
        setWorkouts(fetchedWorkouts);

        // Step 2: split into cached vs missing
        const initialMap = {};
        const missing    = [];

        fetchedWorkouts.forEach(w => {
          if (w.video) {
            initialMap[w.id] = { embedUrl: w.video, title: w.name };
          } else {
            missing.push({ id: w.id, name: w.name });
          }
        });

        setVideoMap(initialMap);
        setLoading(false);

        // Step 3: batch fetch all missing videos in ONE call
        if (missing.length > 0) {
          const batchRes  = await fetch('/api/youtube/batch-search', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ workouts: missing })
          });
          const batchData = await batchRes.json();

          if (batchData.success) {
            const newMap = { ...initialMap };

            batchData.results.forEach(({ id, video }) => {
              newMap[id] = video || { error: true };

              if (video) {
                fetch(`/api/workouts/${id}/video`, {
                  method:  'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body:    JSON.stringify({ video: video.embedUrl })
                }).catch(err => console.warn('Cache failed:', err));
              }
            });

            setVideoMap(newMap);
          }
        }

      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError('Could not connect to server. Please try again.');
        setLoading(false);
      }
    };

    fetchEverything();
  }, []);

  // Loading state 
  if (loading) {
    return (
      <section className="workout-page">
        <div className="page-hero">
          <h1>All Workouts.</h1>
          <p className="subtitle">Fetching the latest workouts for you…</p>
        </div>
        {SECTIONS.map(section => (
          <div key={section.key} className="workout-section">
            <div className="section-header">
              <div className="section-header-left">
                <div className="section-title-row">
                  <img src={section.image} alt={section.label} className="section-icon-img" />
                  <h2 className="section-title">{section.label}</h2>
                </div>
                <p className="section-subtitle">{section.subtitle}</p>
              </div>
            </div>
            <div className="workouts-grid">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        ))}
      </section>
    );
  }

  //  Error state 
  if (error) {
    return (
      <section className="workout-page">
        <div className="state-box error-box">
          <span className="state-icon">⚠️</span>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  // Empty state 
  if (workouts.length === 0) {
    return (
      <section className="workout-page">
        <div className="page-hero">
          <h1>All Workouts.</h1>
        </div>
        <div className="state-box">
          <span className="state-icon">🏋️</span>
          <p>No workouts found. Check back soon!</p>
        </div>
      </section>
    );
  }

  // Group workouts by category 
  const grouped = workouts.reduce((acc, workout) => {
    const cat = workout.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(workout);
    return acc;
  }, {});

  return (
    <div className="workout-page">

      {/*  Page hero */}
      <div className="page-hero">
        <h1>All Workouts.</h1>
        <p className="subtitle">Build strength and confidence, one rep at a time.</p>
      </div>

      {/*  Render each section in defined order */}
      {SECTIONS.map(section => {
        const sectionWorkouts = grouped[section.key] || [];
        if (sectionWorkouts.length === 0) return null;

        return (
          <section key={section.key} className="workout-section">
            <div className="section-header">
              <div className="section-header-left">
                <div className="section-title-row">
                  <img
                    src={section.image}
                    alt={section.label}
                    className="section-icon-img"
                  />
                  <h2 className="section-title">{section.label}</h2>
                </div>
                <p className="section-subtitle">{section.subtitle}</p>
              </div>
              <span className="section-count">{sectionWorkouts.length} workouts</span>
            </div>

            <div className="workouts-grid">
              {sectionWorkouts.map(workout => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  videoData={videoMap[workout.id]}
                />
              ))}
            </div>
          </section>
        );
      })}

    </div>
  );
}
