import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { User, Loader } from 'lucide-react';
import './Auth.css';

export default function SetupProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      navigate('/');
    } catch (err) {
      setError('Failed to update profile. ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page page-content">
      <div className="auth-card">
        <div className="auth-header">
          <User size={40} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
          <h1>Complete Your Profile</h1>
          <p>What should we call you?</p>
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
              placeholder="Enter your full name"
            />
          </div>

          <button disabled={loading || !name.trim()} className="btn btn-primary btn-block" type="submit">
            {loading ? <Loader className="spin" size={18} /> : 'Save & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
