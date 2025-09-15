import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../services/api';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state as { email: string };

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp(email, otp);
      localStorage.setItem('sessionToken', response.data.session.token);
      navigate('/');
    } catch (error) {
      console.error('OTP verification failed', error);
      alert('Invalid OTP');
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2>Enter OTP</h2>
        <p>OTP sent to {email}</p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button className="verify-button" onClick={handleVerifyOtp}>
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OTP;