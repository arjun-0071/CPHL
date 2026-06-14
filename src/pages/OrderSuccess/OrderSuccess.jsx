import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, ShoppingCart } from 'lucide-react';
import './OrderSuccess.css';

export default function OrderSuccess() {
  return (
    <div className="order-success-page page-content">
      <div className="container">
        <div className="os-card">
          <div className="os-icon">
            <CheckCircle size={64} />
          </div>
          <h1 className="os-title">Procurement Request Submitted!</h1>
          <p className="os-message">
            Your order details have been sent to our procurement team. We will
            review your request and get back to you shortly via email.
          </p>

          <div className="os-info">
            <div className="os-info-item">
              <span className="os-info-icon">📧</span>
              <div>
                <strong>Email Confirmation</strong>
                <p>You will receive a confirmation email with your order details.</p>
              </div>
            </div>
            <div className="os-info-item">
              <span className="os-info-icon">⏱️</span>
              <div>
                <strong>Processing Time</strong>
                <p>Our team will process your request within 24-48 hours.</p>
              </div>
            </div>
            <div className="os-info-item">
              <span className="os-info-icon">📞</span>
              <div>
                <strong>Need Help?</strong>
                <p>Contact us at info@cphl.com or call +91 12345 67890.</p>
              </div>
            </div>
          </div>

          <div className="os-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              <Home size={18} /> Go to Home
            </Link>
            <Link to="/products" className="btn btn-outline btn-lg">
              <ShoppingCart size={18} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
