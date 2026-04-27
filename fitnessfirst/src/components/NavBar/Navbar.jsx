
import { useState } from 'react';
import { Link } from 'react-router-dom';
import fitnessFirst from '../../assets/fitness.webp';
import LoginModal from '../../pages/GetStarted/LoginModal.jsx';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <nav className="navbar">
        <img src={fitnessFirst} alt="Fitness First Logo" />
        <h1>Fitness First</h1>

        <div
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/programs">Programs</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/trainers">Trainers</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <button className="btn" onClick={() => setShowLogin(true)}>
              Get Started
            </button>
          </li>
        </ul>
      </nav>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
