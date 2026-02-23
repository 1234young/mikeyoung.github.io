import { Link } from 'react-router-dom';
import './Program.css';
import strengthImg from '../../assets/strength.webp';
import fatLossImg from '../../assets/fat-loss.webp';
import hiitImg from '../../assets/hiit.webp';
import yogaImg from '../../assets/yoga.webp';


const programs = [
  {
    title: 'Strength Training',
    description: 'Build muscle, increase strength, and improve performance.',
    icon: strengthImg,
    path: '/training/strength'
  },
  {
    title: 'Fat Loss',
    description: 'Burn calories, shred fat, and boost your metabolism.',
    icon: fatLossImg,
    path: '/training/fat-loss'
  },
  {
    title: 'HIIT',
    description: 'High intensity workouts designed for maximum results.',
    icon: hiitImg,
    path: '/training/hiit'
  },
  {
    title: 'Yoga & Recovery',
    description: 'Improve flexibility, balance, and muscle recovery.',
    icon: yogaImg,
     path: '/training/yoga-recovery'
  }
];

export default function Programs() {
  return (
    <section className="programs">
      <h2 className="programs-title">Our Programs</h2>
      <p className="programs-subtitle">
        Choose a workout plan tailored to your fitness goals
      </p>

      <div className="programs-grid">
        {programs.map((program) => (
          <div className="program-card" key={program.title}>
            <img 
            src={program.icon} 
            alt={program.title}
            className="program-icon"
            />
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            <Link to={program.path} className="explore-btn">Explore</Link>
           </div>

        ))}
      </div>
    </section>
  );
}
