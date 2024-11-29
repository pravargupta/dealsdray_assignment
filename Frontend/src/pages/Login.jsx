import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json(); // Get the response data
        await login(data); // Update auth context
        navigate('/employees'); // Navigate to dashboard or home page
        
      } catch (err) {
        console.error('Login failed:', err);
        setError(err.message);
      }
    };
    

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    form: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    header: {
      color: '#333',
      fontSize: '2.5rem',
      fontWeight: '600',
      marginBottom: '2rem',
      borderBottom: '2px solid #333',
      paddingBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      marginBottom: '1rem',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#333',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    error: {
      color: 'red',
      marginBottom: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>Login</h2>
        {error && <div style={styles.error}>{error}</div>}
        <div>
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            style={styles.input}
           required/>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            style={styles.input}
           required/>
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;