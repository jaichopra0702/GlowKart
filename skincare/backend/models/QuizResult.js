// quizSchema.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  answers: {
    type: Map,
    of: String,  // This allows storing a map of question number to answer
  },
  category: String,
  recommendations: [String],
  dateTaken: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quiz', quizSchema);
