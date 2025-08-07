import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
      
    <>
  
    <footer className="footer">
      <div className="footer-container">
        {/* Left column: Brand & tagline */}
        <div className="footer-brand">
          <h2 className="footer-title">GO4GIVE</h2>
          <p className="footer-tagline">
            A registered non-profit organisation committed <br /> to supporting orphans, the elderly and underprivileged communities.
            <br />
            All donations are eligible for exemption <br />under <strong>Section 12A & 80G</strong> of the Income-Tax Act.
          </p>
        </div>

        {/* Center column: Quick links */}
        <nav className="footer-links">
          <h5>Quick Links</h5>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/index">Donation</Link></li>
       
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </nav>

        {/* Right column: CTA & socials */}
        <div className="footer-right">
          <Link to="/signup" className="footer-btn">Sign Up</Link>
          <div className="footer-socials">
            <a href="https://www.facebook.com/" aria-label="Facebook"><i className="fab fa-facebook-f" ></i></a>
            <a href="https://www.instagram.com/" aria-label="X / Twitter"><i className="fab fa-x-twitter"></i></a>
            <a href="https://x.com/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://www.youtube.com/" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom stripe */}
      <div className="footer-bottom">
        <p>© 2024 GO4GIVE | Empowering Lives Through Compassion & Charity | All Rights Reserved</p>
      </div>
    </footer>
    </>
  );
}


export default Footer;