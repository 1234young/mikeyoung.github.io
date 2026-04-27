import { useState } from 'react';
import './LoginModal.css';

export default function LoginModal({ isOpen, onClose, onLoginSuccess, onOpenRegister }) {

  //  Controlled form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //  UI feedback state
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  //  Don't render anything if modal is closed
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🚫 prevents page reload

    setMessage('');

    try {
      //  API request to backend
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        //  Sending login data
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        //  Persist user, survives refresh
        localStorage.setItem('user', JSON.stringify(data.user));

        setIsError(false);
        setMessage('Login successful!');

        //  CRITICAL: Notify parent components
        // This triggers:
        // LoginModal → Hero → App → re-render → unlock route
        onLoginSuccess();

      } else if (data.message === 'not-registered') {
        //  Backend says user doesn't exist
        setIsError(true);
        setMessage('not-registered');

      } else if (data.message === 'Incorrect password.') {
        //  Wrong password case
        setIsError(true);
        setMessage('Incorrect password. Please try again.');

      } else {
        //  Generic error fallback
        setIsError(true);
        setMessage(data.message || 'Login failed.');
      }

    } catch (err) {
      //  Network/server error
      console.error('Login error:', err);
      setIsError(true);
      setMessage('Server error. Is your backend running?');
    }
  };

  return (
    //  Clicking backdrop closes modal
    <div className="modal-backdrop" onClick={onClose}>

      {/*  Prevent click inside modal from closing it */}
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>

        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>Welcome Back</h2>
        <p>Login to continue your fitness journey</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"

            // Controlled input, React owns the value
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        {/* Special case, redirect to register */}
        {message === 'not-registered' && (
          <p className="login-message error">
            Not a registered user.{' '}
            <span className="register-link" onClick={onOpenRegister}>
              Click here to register
            </span>
          </p>
        )}

        {/* General feedback messages */}
        {message && message !== 'not-registered' && (
          <p className={`login-message ${isError ? 'error' : 'success'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}