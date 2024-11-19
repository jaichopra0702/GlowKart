// User model (models/User.js)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  answers: [String],
  category: String,
  recommendations: [String],  // This will store the recommended products
});

const User = mongoose.model('User', userSchema);

module.exports = User;