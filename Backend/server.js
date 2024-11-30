import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employee.js';
import authMiddleware from './middleware/auth.js';  // Import the authMiddleware

dotenv.config(); // For environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/employeeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Error:', err));

// Use the auth routes with '/api/auth' prefix
app.use('/api/auth', authRoutes);

// Use employee routes with authentication middleware and '/api/employees' prefix
app.use('/api/employees', authMiddleware, employeeRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/images', express.static('public/images'));