import { useState } from 'react';
import './RegisterModal.css';

export default function RegisterModal({ isOpen, onClose, onRegistered }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsError(false);
        setMessage('Account created! Taking you to login...');
        setTimeout(() => onRegistered(), 1500); // ← back to login modal
      } else {
        setIsError(true);
        setMessage(data.message || 'Registration failed. Try again.');
      }
    } catch (err) {
      setIsError(true);
      setMessage(`Server error: ${err.message || 'Please try again.'}`);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="register-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>

        <h2>Create Account</h2>
        <p>Sign up to start your fitness journey</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
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
          <button type="submit">Register</button>
        </form>

        {message && (
          <p className={`register-message ${isError ? 'error' : 'success'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}