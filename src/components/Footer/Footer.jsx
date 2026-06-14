import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      {/* Top Strip */}
      <div className="footer-top">
        <div className="container footer-top-inner">
          <div className="footer-feature">
            <span className="footer-feature-icon">🚚</span>
            <div>
              <strong>Fast Procurement</strong>
              <p>Quick processing of your orders</p>
            </div>
          </div>
          <div className="footer-feature">
            <span className="footer-feature-icon">✅</span>
            <div>
              <strong>Genuine Products</strong>
              <p>100% authentic medicines</p>
            </div>
          </div>
          <div className="footer-feature">
            <span className="footer-feature-icon">💰</span>
            <div>
              <strong>Best Prices</strong>
              <p>Competitive procurement rates</p>
            </div>
          </div>
          <div className="footer-feature">
            <span className="footer-feature-icon">🔒</span>
            <div>
              <strong>Secure & Trusted</strong>
              <p>Verified pharmaceutical sources</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand Column */}
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <img src="/CPHL_Logo.png" alt="CPHL Logo" className="logo-icon-img" />
            </div>
            <p className="footer-desc">
              CPHL is a trusted pharmaceutical procurement platform. Browse our
              extensive catalog, select your products, and submit your
              procurement request — we handle the rest.
            </p>
            <div className="footer-contact">
              <a href="mailto:info@cphl.com" className="footer-contact-item">
                <Mail size={16} /> info@cphl.com
              </a>
              <a href="tel:+911234567890" className="footer-contact-item">
                <Phone size={16} /> +91 12345 67890
              </a>
              <span className="footer-contact-item">
                <MapPin size={16} /> India
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/products">All Products</Link>
              </li>
              <li>
                <Link to="/cart">My Cart</Link>
              </li>
              <li>
                <Link to="/profile">My Account</Link>
              </li>
              <li>
                <Link to="/checkout">Submit Order</Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="footer-col">
            <h4 className="footer-heading">About CPHL</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} CPHL Pharma Procurement. All rights reserved.</p>
          <p className="footer-disclaimer">
            This is a procurement platform. No direct sales or payments processed here.
          </p>
        </div>
      </div>
    </footer>
  );
}
