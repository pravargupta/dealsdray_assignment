import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Only hash the password if it's new or modified
  try {
    const salt = await bcrypt.genSalt(10);  // Generate salt with 10 rounds (this is a common and secure choice)
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password with the salt
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);  // Compare the plaintext password with the hashed one
};

const User = mongoose.model('User', userSchema);
export default User;
