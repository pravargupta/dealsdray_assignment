import React from 'react';

const Home = () => {
  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      color: '#333',
      fontSize: '2.5rem',
      fontWeight: '600',
      marginBottom: '2rem',
      borderBottom: '2px solid #333',
      paddingBottom: '0.5rem'
    },
    content: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.header}>Welcome to the Admin Panel</h1>
        <p>Manage your employees and resources efficiently.</p>
      </div>
    </div>
  );
};

export default Home;