import './Footer.css';
import logo from '../../assets/fitness.webp';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* LOGO */}
        <div className="footer-brand">
          <img src={logo} alt="Fitness Brand Logo" />
          <p>Train smart. Stay strong. Live fit.</p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Programs</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* SOCIALS */}
        <div className="footer-socials">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com" target='_blank' aria-label="Instagram"><i class="fa-brands fa-square-instagram"></i></a>
            <a href="https://www.twitter.com" target='_blank' aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="https://www.facebook.com" target='_blank' aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Fitness Brand. All rights reserved.
      </div>
    </footer>
  );
}