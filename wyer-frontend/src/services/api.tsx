import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sessionToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const sendOtp = async (email: string) => {
  return api.post('/auth/otp', { email });
};

export const verifyOtp = async (email: string, otp: string) => {
  return api.post('/auth/verify-otp', { email, otp });
};

export const getUsers = async () => {
  return api.get('/users');
};