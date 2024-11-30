import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, enum: ['HR', 'Manager', 'Sales'], required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  course: [{ type: String, enum: ['MCA', 'BCA', 'BSC'] }],
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;
