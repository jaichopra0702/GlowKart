const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  answers: { type: Map, of: String },  // Store answers in a map (key-value pairs)
  category: { type: String, required: true }, // Store the selected category
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;
