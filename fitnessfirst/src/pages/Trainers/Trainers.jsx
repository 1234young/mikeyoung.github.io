import { useEffect } from "react";
import "./Trainers.css";
import Mike from '../../assets/mike-kay.webp';
import Sarah from '../../assets/sarah.webp';
import Jane from '../../assets/jane.webp';

export default function Trainers() {
  useEffect(() => {
    const cards = document.querySelectorAll(".trainer-card");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("show");
            }, index * 120);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="trainers">
      <div className="trainers-header">
        <h2>Meet Our Trainers</h2>
        <p>Certified professionals dedicated to your fitness journey</p>
      </div>

      <div className="trainers-grid">
        <div className="trainer-card">
          <img src={Mike} alt="Trainer John" />
          <h3>Mike Kay</h3>
          <span>Strength & Conditioning</span>
          <p>
            8+ years experience helping athletes build power, endurance,
            and confidence.
          </p>
        </div>

        <div className="trainer-card popular">
          <img src={Sarah} alt="Trainer Sarah" />
          <h3>Sarah Williams</h3>
          <span>Weight Loss Specialist</span>
          <p>
            Expert in fat loss programs and lifestyle transformation with
            proven results.
          </p>
        </div>

        <div className="trainer-card">
          <img src={Jane} alt="Trainer Mike" />
          <h3>Jackie Jane</h3>
          <span>Yoga & Mobility</span>
          <p>
            Experience: 7+ Years; Focuses on flexibility, recovery, and mind-body balance for
            all levels.
          </p>
        </div>
      </div>
    </section>
  );
}