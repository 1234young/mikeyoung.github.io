
import './LoginModal.css';

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close login modal">
          x
        </button>

        <h2>Welcome Back</h2>
        <p>Login to continue your fitness journey</p>

        <form>
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>

        <div className="signup-link">
          Don't have an account? <span>Sign up here</span>
        </div>
      </div>
    </div>
  );
}
