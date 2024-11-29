import mongoose from 'mongoose';

const connectDB = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/employeeDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('Error:', err));
};

export default connectDB;
