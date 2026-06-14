import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { UserPlus, Loader } from 'lucide-react';
import { getIsIndianLocation } from '../../utils/location';
import './Auth.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
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

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user profile with the name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Failed to create an account. Email is already registered.');
      } else {
        setError(err.message || 'Failed to create an account.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignUp() {
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
      setError(err.message || 'Failed to sign up with Google.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page page-content">
      <div className="auth-card">
        <div className="auth-header">
          <UserPlus size={40} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
          <h1>Create an Account</h1>
          <p>Join CPHL to manage your procurement</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="John Doe"
            />
          </div>

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
              minLength="6"
            />
          </div>

          <button disabled={loading} className="btn btn-primary btn-block" type="submit">
            {loading ? <Loader className="spin" size={18} /> : 'Sign Up'}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button 
          onClick={handleGoogleSignUp} 
          disabled={loading} 
          className="btn btn-outline btn-block google-btn"
          type="button"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="google-icon" />
          Sign up with Google
        </button>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
