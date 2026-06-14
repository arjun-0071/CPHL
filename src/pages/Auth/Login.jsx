import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { LogIn, Loader } from 'lucide-react';
import { getIsIndianLocation } from '../../utils/location';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      
      // Request location and check if in India
      const isIndia = await getIsIndianLocation();
      if (!isIndia) {
        throw new Error('Access denied. CPHL is only accessible from within India.');
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Failed to sign in. Please check your credentials.');
      } else {
        setError(err.message || 'Failed to sign in.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);

      // Request location and check if in India
      const isIndia = await getIsIndianLocation();
      if (!isIndia) {
        throw new Error('Access denied. CPHL is only accessible from within India.');
      }

      const result = await signInWithPopup(auth, googleProvider);
      const details = getAdditionalUserInfo(result);
      if (details?.isNewUser) {
        navigate('/setup-profile');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page page-content">
      <div className="auth-card">
        <div className="auth-header">
          <LogIn size={40} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
          <h1>Welcome Back</h1>
          <p>Sign in to your CPHL account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="your@email.com"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
            />
          </div>

          <button disabled={loading} className="btn btn-primary btn-block" type="submit">
            {loading ? <Loader className="spin" size={18} /> : 'Sign In'}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button 
          onClick={handleGoogleSignIn} 
          disabled={loading} 
          className="btn btn-outline btn-block google-btn"
          type="button"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="google-icon" />
          Sign in with Google
        </button>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
