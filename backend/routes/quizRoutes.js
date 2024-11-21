//quizRoutes.js
const express = require('express');
const router = express.Router();
const { submitQuiz } = require('../controllers/quizController');

// POST route for submitting a quiz
router.post('/submit', submitQuiz);

module.exports = router;