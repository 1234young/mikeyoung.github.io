import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import heroImage from '../../assets/athlete.webp';
import LoginModal from '../../pages/GetStarted/LoginModal';
import RegisterModal from '../../pages/GetStarted/RegisterModal';

export default function Hero({ onLoginSuccess }) {
  //  React Router hook, lets you change pages programmatically
  const navigate = useNavigate();

  //  Controls visibility of modals (UI state)
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleStartTraining = () => {
    //  Check if user exists in localStorage (persistent login)
    const user = localStorage.getItem('user');

    if (user) {
      //  User already logged in, skip login flow
      navigate('/workouts');
    } else {
      //  Not logged in, trigger login modal instead
      setShowLogin(true);
    }
  };

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
            {/*  Entry point to auth flow */}
            <button onClick={handleStartTraining} className="hero-btn primary">
              Start Training
            </button>

            <button
              onClick={() => navigate('/programs')}
              className="hero-btn secondary"
            >
              View Programs
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Athlete training" />
        </div>
      </div>

      {/*  LOGIN MODAL */}
      {showLogin && (
        <LoginModal
          isOpen={showLogin}

          //  Close modal
          onClose={() => setShowLogin(false)}

          onLoginSuccess={() => {
            //  STEP 1: Update GLOBAL state (App.jsx)
            // This is what allows protected routes to unlock
            onLoginSuccess();

            //  STEP 2: Clean UI (close modal)
            setShowLogin(false);

            //  STEP 3: Navigate AFTER state update
            // If you navigate before state → bug returns
            navigate('/workouts');
          }}

          onOpenRegister={() => {
            // Switch modals (login → register)
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {/*  REGISTER MODAL */}
      {showRegister && (
        <RegisterModal
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}

          onRegistered={() => {
            //  After registration → send user to login
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </section>
  );
}