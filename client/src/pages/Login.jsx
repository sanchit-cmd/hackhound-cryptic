import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if we have an auth token or success parameter
    const token = searchParams.get('token');
    const success = searchParams.get('success');

    if (token || success) {
      // Clear URL parameters and redirect to home
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = api.googleAuth;
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h1 className='login-title'>Cryptic Hunt</h1>
        <button onClick={handleGoogleLogin} className='login-button'>
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
