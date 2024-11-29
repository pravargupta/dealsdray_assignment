import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api';

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    header: {
      color: '#333',
      fontSize: '2rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
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
    select: {
      width: '100%',
      padding: '0.5rem',
      marginBottom: '1rem',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    radioGroup: {
      marginBottom: '1rem'
    },
    checkboxGroup: {
      marginBottom: '1rem'
    },
    fileInput: {
      marginBottom: '1rem'
    },
    button: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem'
    }
  };

  useEffect(() => {
    axios.get(`/employees/${id}`)
      .then((response) => setEmployee(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, image: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      course: checked
        ? [...prev.course, value]
        : prev.course.filter((course) => course !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    Object.entries(employee).forEach(([key, value]) => {
      if (key === 'course') {
        formData.append(key, JSON.stringify(value));
      } else if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post(`/employees/${id}`, employee, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Employee updated successfully!');
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error.response?.data || error.message);
      alert('Failed to update employee. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1 style={styles.header}>Edit Employee</h1>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="mobile"
          value={employee.mobile}
          onChange={handleChange}
          placeholder="Mobile No"
          required
          style={styles.input}
        />
        <select
          name="designation"
          value={employee.designation}
          onChange={handleChange}
          required
          style={styles.select}
        >
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
        <div style={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={employee.gender === 'Male'}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={employee.gender === 'Female'}
              onChange={handleChange}
              required
            />
            Female
          </label>
        </div>
        <div style={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              name="course"
              value="MCA"
              checked={employee.course.includes('MCA')}
              onChange={handleCheckboxChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={employee.course.includes('BCA')}
              onChange={handleCheckboxChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={employee.course.includes('BSC')}
              onChange={handleCheckboxChange}
            />
            BSC
          </label>
        </div>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        <button type="submit" style={styles.button}>Update</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;