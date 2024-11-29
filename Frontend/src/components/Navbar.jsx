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

  const navStyles = {
    nav: {
      backgroundColor: '#333',
      padding: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
      ':hover': {
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
      ':hover': {
        backgroundColor: '#c82333'
      }
    }
  };

  return (
    <nav style={navStyles.nav}>
      <ul style={navStyles.ul}>
        <li><Link style={navStyles.link} to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link style={navStyles.link} to="/employees">Employee List</Link></li>
            <li><button style={navStyles.button} onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><Link style={navStyles.link} to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;