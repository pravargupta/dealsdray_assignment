import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

mongoose.connect('mongodb://127.0.0.1:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('Error:', err));

const createUser = async () => {
  const hashedPassword = await bcrypt.hash('admin', 10); 

  const user = new User({
    username: 'admin',
    password: hashedPassword,
  });

  try {
    await user.save();
    console.log('User saved successfully');
  } catch (err) {
    console.error('Error saving user:', err);
  }
};
createUser();
