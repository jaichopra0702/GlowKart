// models/UserQuiz.js
const mongoose = require('mongoose');

const UserQuizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizResults: { type: Object, required: true },  // Store the quiz answers or results
  recommendedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]  // Store product references
});

const UserQuiz = mongoose.model('UserQuiz', UserQuizSchema);

module.exports = UserQuiz;
