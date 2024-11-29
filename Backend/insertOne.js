import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';  // Assuming your model is in 'models/User.js'

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('Error:', err));

// Create and save a new user
const createUser = async () => {
  const hashedPassword = await bcrypt.hash('admin', 10);  // Hash the plain password

  const user = new User({
    username: 'admin',  // Change this to the username you want to insert
    password: hashedPassword,  // Store the hashed password
  });

  try {
    await user.save();  // Save the user to the database
    console.log('User saved successfully');
  } catch (err) {
    console.error('Error saving user:', err);
  }
};

// Run the function to insert the user
createUser();
