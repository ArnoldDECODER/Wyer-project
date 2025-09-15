import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      navigate('/otp', { state: { email } });
    } catch (error) {
      console.error('OTP send failed', error);
      alert('Failed to send OTP');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login / Signup</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button className="login-button" onClick={handleSendOtp}>
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default Login;