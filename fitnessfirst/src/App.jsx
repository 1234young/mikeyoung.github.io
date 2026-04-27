import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/NavBar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import Stats from './components/Stats/Stats.jsx';
import Program from './components/Programs/Program.jsx';
import Main from './components/Main/Main.jsx';
import WelcomeMarquee from './components/Welcome/WelcomeMarquee.jsx';
import AppPreview from './components/AppPreview/AppPreview.jsx';
import Action from './components/CTA/Action.jsx';
import Footer from './components/Footer/Footer.jsx';
import Pricing from './pages/Pricing/Pricing.jsx';
import Trainers from './pages/Trainers/Trainers.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Workout from './pages/Workouts/Workout.jsx';

export default function App() {

  // This is the GLOBAL AUTH STATE 
  // Using a function prevents re-running localStorage on every render
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('user');
  });

  //  Tracks current route (used to conditionally render homepage sections)
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  //  Called AFTER successful login, updates React state
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // ⚡ THIS triggers re-render instantly
  };

  //  Logout clears both storage + state 
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  //  Sync state with localStorage changes (e.g. multi-tabs)
  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('user'));
    };

    window.addEventListener('storage', syncAuth);

    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  return (
    <>
      <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <WelcomeMarquee />

      <Routes>

        {/*  Passing login handler DOWN to Hero */}
        <Route
          path="/"
          element={<Hero onLoginSuccess={handleLoginSuccess} />}
        />

        <Route path="/programs" element={<Program />} />
        <Route path="/training" element={<Program />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/contact" element={<Contact />} />

        {/*  PROTECTED ROUTE */}
        <Route
          path="/workouts"
          element={
            isLoggedIn
              ? <Workout /> //  allow access
              : <Navigate to="/" replace /> //  block access
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/*  Only show these sections on homepage */}
      {isHomePage && (
        <>
          <Stats />
          <Program />
          <Main />
          <AppPreview />
          <Action />
        </>
      )}

      <Footer onLogout={handleLogout} />
    </>
  );
}