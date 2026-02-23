import { Link } from 'react-router-dom';
import './Hero.css';
import heroImage from '../../assets/athlete.webp';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Train <span>Hard</span>.<br />
            Stay <span>Strong</span>.<br />
            Build Your <span>Body</span>.
          </h1>

          <p>
            Transform your fitness journey with structured workouts,
            expert guidance, and real results.
          </p>

          <div className="hero-buttons">
            <Link to="/training" className="hero-btn primary">
              Start Training
            </Link>
            <Link to="/programs" className="hero-btn secondary">
              View Programs
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Athlete training" />
        </div>
      </div>
    </section>
  );
}
