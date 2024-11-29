import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import EmployeeList from './pages/EmployeeList';
import EmployeeEdit from './pages/EmployeeEdit';
import CreateEmployee from './pages/CreateEmployee';

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/new" element={<CreateEmployee />} />
          <Route path="/employees/edit/:id" element={<EmployeeEdit />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;