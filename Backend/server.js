import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employee.js';
import authMiddleware from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect('mongodb://127.0.0.1:27017/employeeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Error:', err));

app.use('/api/auth', authRoutes);

app.use('/api/employees', authMiddleware, employeeRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/images', express.static('public/images'));