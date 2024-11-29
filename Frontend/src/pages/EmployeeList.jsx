import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      color: '#333',
      fontSize: '2rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      borderBottom: '2px solid #333',
      paddingBottom: '0.5rem'
    },
    createButton: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      textDecoration: 'none',
      display: 'inline-block',
      marginBottom: '1.5rem'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    th: {
      backgroundColor: '#333',
      color: 'white',
      padding: '1rem',
      textAlign: 'left'
    },
    td: {
      padding: '1rem',
      borderBottom: '1px solid #ddd'
    },
    actionButton: {
      marginRight: '0.5rem',
      padding: '0.3rem 0.8rem',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer'
    },
    editLink: {
      backgroundColor: '#007bff',
      color: 'white',
      textDecoration: 'none',
      padding: '0.3rem 0.8rem',
      borderRadius: '4px',
      marginRight: '0.5rem'
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: 'white'
    }
  };

  useEffect(() => {
    axios.get('/employees')
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`/employees/${id}`)
      .then(() => setEmployees(employees.filter(emp => emp._id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Employee List</h1>
      <Link to="/employees/new" style={styles.createButton}>Create Employee</Link>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Unique ID</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Mobile No</th>
            <th style={styles.th}>Designation</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>Course</th>
            <th style={styles.th}>Create Date</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td style={styles.td}>{emp._id}</td>
              <td style={styles.td}>
                <img
                  src={`http://localhost:5000/uploads/${emp.image}`}
                  alt={emp.name}
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
              </td>
              <td style={styles.td}>{emp.name}</td>
              <td style={styles.td}>{emp.email}</td>
              <td style={styles.td}>{emp.mobile}</td>
              <td style={styles.td}>{emp.designation}</td>
              <td style={styles.td}>{emp.gender}</td>
              <td style={styles.td}>{emp.course.join(', ')}</td>
              <td style={styles.td}>{new Date(emp.createdAt).toLocaleDateString()}</td>
              <td style={styles.td}>
                <Link style={styles.editLink} to={`/employees/edit/${emp._id}`}>Edit</Link>
                <button 
                  style={{...styles.actionButton, ...styles.deleteButton}}
                  onClick={() => deleteEmployee(emp._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;