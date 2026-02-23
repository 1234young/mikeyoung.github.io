import './AppPreview.css';
import app1 from '../../assets/progress.webp';
import app2 from '../../assets/workout.webp';
import app3 from '../../assets/nutrition.webp';

export default function AppPreview() {
  return (
    <section className="app-preview">
      <h2>Train Smarter With Our App</h2>
      <p className="app-preview-subtitle">
        Track workouts, monitor progress, and stay motivated, all in one place.
      </p>

      <div className="app-grid">
        <div className="app-card">
          <img src={app1} alt="Workout dashboard" />
          <span>Workout Dashboard</span>
        </div>

        <div className="app-card featured">
          <img src={app2} alt="Progress tracking" />
          <span>Progress Tracking</span>
        </div>

        <div className="app-card">
          <img src={app3} alt="Nutrition insights" />
          <span>Nutrition Insights</span>
        </div>
      </div>
    </section>
  );
}