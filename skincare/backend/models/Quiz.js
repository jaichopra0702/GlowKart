const mongoose = require('mongoose');

// Define the schema for the quiz data
const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Optional email format validation
  },
  score: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now } // Automatically set the submission time
});

// Create the model using the schema
const Quiz = mongoose.model('Quiz', quizSchema);

// Export the model to use it in other parts of the application
module.exports = Quiz;
