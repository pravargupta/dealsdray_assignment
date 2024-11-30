import express from 'express';
import multer from 'multer';
import path from 'path';
import Employee from '../models/Employees.js';

const router = express.Router();
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
});

const DEFAULT_IMAGE = '/images/placeholder.png';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateMobile = (mobile) => {
  // Matches: 
  // - 10 digits (1234567890)
  // - +91 followed by 10 digits (+911234567890)
  // - 0 followed by 10 digits (01234567890)
  const mobileRegex = /^(\+91|0)?[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
};

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    
    if (!name || !email || !mobile || !designation || !gender || !course) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (!validateMobile(mobile)) {
      return res.status(400).json({ message: 'Invalid mobile number format. Must be 10 digits, optionally starting with +91 or 0.' });
    }

    const imageUrl = req.file 
      ? `${BASE_URL}/images/${req.file.filename}` 
      : `${BASE_URL}${DEFAULT_IMAGE}`;

    const employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course: JSON.parse(course),
      imageUrl
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error saving employee:', error);
    res.status(500).json({ message: error.toString() });
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found.' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;

    if (email && !validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (mobile && !validateMobile(mobile)) {
      return res.status(400).json({ message: 'Invalid mobile number format. Must be 10 digits, optionally starting with +91 or 0.' });
    }

    const updateData = {
      name,
      email,
      mobile,
      designation,
      gender,
      course: JSON.parse(course)
    };

    if (req.file) {
      updateData.imageUrl = `${BASE_URL}/images/${req.file.filename}`;
    } else if (!req.body.imageUrl) {
      updateData.imageUrl = `${BASE_URL}${DEFAULT_IMAGE}`;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id, 
      updateData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
