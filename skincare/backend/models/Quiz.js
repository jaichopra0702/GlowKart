const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  answers: { type: [String], required: true },
  category: { type: String, required: true },
  recommendations: [String], // This stores the recommended products
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
