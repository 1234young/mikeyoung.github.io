import './Stats.css';
import strengthImg from '../../assets/strength.webp';
import clockImg from '../../assets/clock.webp';
import memberImg from '../../assets/members.webp';
import starImg from '../../assets/star.webp';

export default function Stats() {
  return (
    <section className="stats">
      <div className="stats-container">

        <div className="stat-card">
          <span className="stat-icon"><img src={strengthImg} alt="Strength Icon" /></span>
          <h2>500+</h2>
          <p>Workouts</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon"><img src={memberImg} alt="Member Icon" /></span>
          <h2>10k+</h2>
          <p>Members</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon"><img src={clockImg} alt="Clock Icon" /></span>
          <h2>24/7</h2>
          <p>Access</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon"><img src={starImg} alt="Star Icon" /></span>
          <h2>4.9</h2>
          <p>Rating</p>
        </div>

      </div>
    </section>
  );
}
