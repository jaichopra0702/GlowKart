const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// POST route for submitting a quiz
router.post('/submit', quizController.submitQuiz);

// Export the router
module.exports = router;
