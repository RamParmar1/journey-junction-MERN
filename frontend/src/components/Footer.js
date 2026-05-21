import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logoImage from "../assets/favicon-main.png";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-glow"></div>
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="brand-icon">
                <img src={logoImage} alt="EliteTravel" style={{ width: '24px', height: '24px' }} />
              </div>
              <div className="brand-name">Journey Junction</div>
            </div>
            <p className="brand-desc">
              Experience the world with unparalleled luxury and comfort. Discover exclusive destinations crafted for the extraordinary traveler.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4>Explore</h4>
              <ul className="footer-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/packages">Exotic Packages</Link></li>
                <li><Link to="/about">About Us</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <ul className="footer-nav">
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-text">
            © {new Date().getFullYear()} <span className="highlight">Journey Junction</span>. All rights reserved.
          </p>
          <div className="socials">
            <ul>
              <li><a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a></li>
              <li><a href="https://www.linkedin.com/in/ram-parmar-7b3664398" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;