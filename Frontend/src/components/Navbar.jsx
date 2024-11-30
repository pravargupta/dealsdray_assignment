import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const styles = {
    container: {
      position: 'relative',
      width: '100%'
    },
    nav: {
      backgroundColor: '#333',
      padding: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative',
      width: '100%'
    },
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: '2rem'
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'color 0.3s ease',
      '&:hover': {
        color: '#ddd'
      }
    },
    button: {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: '#c82333'
      }
    },
    logoContainer: {
      position: 'absolute',
      left: '10px',
      top: 'calc(100% + 10px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: '0px',
      borderRadius: '50%',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    logo: {
      width: '50px',
      height: 'auto',
      display: 'block'
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <ul style={styles.ul}>
          <li><Link style={styles.link} to="/">Home</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link style={styles.link} to="/employees">Employee List</Link></li>
              <li><button style={styles.button} onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><Link style={styles.link} to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
      <div style={styles.logoContainer}>
        <img 
          src="/images/logo.png"
          alt="Company Logo" 
          style={styles.logo}
          onError={(e) => console.error('Logo failed to load')}
          onLoad={(e) => console.log('Logo loaded successfully')}
        />
      </div>
    </div>
  );
};

export default Navbar;