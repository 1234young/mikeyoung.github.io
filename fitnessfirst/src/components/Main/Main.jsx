import './Main.css';
import fitnessImg from '../../assets/fitness-app-review.webp';

export default function Main() {
  return (
    <section className="why">
      <div className="why-container">

        <div className="why-text">
          <h2>Why Choose Us</h2>
          <p>
            We combine expert coaching, smart technology, and proven
            training systems to help you reach your fitness goals faster.
            Train with certified professionals who understand both performance and safety.
            Programs designed for real people, whether you’re a beginner or an athlete.
            Smart progress tracking that keeps you motivated and accountable.
            Science-backed workouts proven to deliver results efficiently.
            Flexible training schedules that fit your lifestyle, not the other way around.
            A supportive fitness community that pushes you to stay consistent.
          </p>

          <ul className="why-list">
            <li>
              <span className="check">✔</span>
              Certified Trainers
            </li>
            <li>
              <span className="check">✔</span>
              Personalized Plans
            </li>
            <li>
              <span className="check">✔</span>
              Track Your Progress
            </li>
            <li>
              <span className="check">✔</span>
              Nutrition Guidance
            </li>
          </ul>
        </div>

        
        <div className="why-image">
          <img src={fitnessImg} alt="Why choose our fitness platform" />
        </div>

      </div>
    </section>
  );
}