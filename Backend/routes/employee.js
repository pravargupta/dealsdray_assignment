import express from 'express';
import Employee from '../models/Employees.js';

const router = express.Router();

// Create Employee
router.post('/', async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course, imageUrl } = req.body;
    // console.log(req);
    // console.log(name, email, mobile, designation, gender, course, imageUrl);
    // Validation: Check for required fields
    if (!name || !email || !mobile || !designation || !gender || !course) {
      console.error('Validation failed: Missing required fields');
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Save Employee
    const employee = new Employee({ name, email, mobile, designation, gender, course, imageUrl });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error saving employee:', error);
    //check which field is missing
    res.status(500).json({ message: error });
  }
});

// Get All Employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found.' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Employee
router.post('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found.' });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found.' });
    res.json({ message: 'Employee deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
