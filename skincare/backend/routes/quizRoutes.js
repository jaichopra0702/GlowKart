const express = require('express');
const { submitQuiz } = require('../controllers/quizController'); // Import the controller

const router = express.Router();

// Define the route for POST /submit-quiz
router.post('/submit-quiz', submitQuiz);

module.exports = router; // Export the router to use in server.js
