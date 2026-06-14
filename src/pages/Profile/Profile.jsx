import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingCart, Package, LogIn, ArrowRight, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import './Profile.css';

export default function Profile() {
  const { cartCount, cartTotal } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Failed to sign out', err);
    }
  }

  return (
    <div className="profile-page page-content">
      <div className="container">
        <h1 className="profile-title">
          <User size={28} /> My Account
        </h1>

        <div className="profile-grid">
          <div className="profile-card profile-auth-card">
            <div className="profile-auth-icon">
              <User size={48} />
            </div>
            {currentUser ? (
              <>
                <h2>Welcome, {currentUser.displayName || 'User'}!</h2>
                <p style={{ marginBottom: '24px' }}>{currentUser.email}</p>
                <button onClick={handleSignOut} className="btn btn-outline">
                  <LogOut size={18} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <h2>Welcome to CPHL</h2>
                <p>
                  Sign in or create an account to manage your procurement orders and save your details.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
                  <Link to="/login" className="btn btn-primary">Sign In</Link>
                  <Link to="/signup" className="btn btn-outline">Create Account</Link>
                </div>
              </>
            )}
          </div>

          {/* Quick Actions */}
          <div className="profile-actions">
            <Link to="/cart" className="profile-action-card">
              <div className="profile-action-icon" style={{ background: '#f0fdfa' }}>
                <ShoppingCart size={24} color="var(--color-primary)" />
              </div>
              <div className="profile-action-info">
                <h3>My Cart</h3>
                <p>
                  {cartCount > 0
                    ? `${cartCount} items • ₹${cartTotal.toFixed(0)}`
                    : 'Your cart is empty'}
                </p>
              </div>
              <ArrowRight size={18} className="profile-action-arrow" />
            </Link>

            <Link to="/products" className="profile-action-card">
              <div className="profile-action-icon" style={{ background: '#fff8e3' }}>
                <Package size={24} color="var(--color-accent)" />
              </div>
              <div className="profile-action-info">
                <h3>Browse Products</h3>
                <p>Explore our full product catalog</p>
              </div>
              <ArrowRight size={18} className="profile-action-arrow" />
            </Link>

            <Link to="/checkout" className="profile-action-card">
              <div className="profile-action-icon" style={{ background: '#f5f0ff' }}>
                <LogIn size={24} color="#6c5ce7" />
              </div>
              <div className="profile-action-info">
                <h3>Submit Order</h3>
                <p>Place your procurement request</p>
              </div>
              <ArrowRight size={18} className="profile-action-arrow" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
