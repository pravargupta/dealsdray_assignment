// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;