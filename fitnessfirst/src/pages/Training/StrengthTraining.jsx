import './StrengthTraining.css';

export default function StrengthTraining() {
  return (
    <section className="training-page">
      <div className="training-content">
        <h1>Strength Training</h1>
        <p>
          Build full-body strength with progressive overload, compound lifts,
          and structured weekly sessions.
        </p>

        <div className="training-plan">
          <h2>Starter Plan</h2>
          <ul>
            <li>Day 1: Squat, Bench Press, Row</li>
            <li>Day 2: Deadlift, Overhead Press, Pull-Ups</li>
            <li>Day 3: Full-body accessory and core work</li>
            <li>Rest 60-120 seconds between sets</li>
          </ul>
        </div>
      </div>
    </section>
  );
}