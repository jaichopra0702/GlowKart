const fs = require('fs');
const path = require('path');
const Quiz = require('../models/Quiz');
const QUIZ_FILE_PATH = path.join(__dirname, '../data/quizData.json'); // Path to save quiz data

// Utility function to validate quiz data
const validateQuizData = (data) => {
  return data && typeof data === 'object' && data.hasOwnProperty('name') && data.hasOwnProperty('email');
};

// Ensure the directory exists
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true }); // Create directory recursively if it doesn't exist
  }
};

// Controller to handle quiz submission
const submitQuiz = async (req, res) => {
  const quizData = req.body;

  if (!validateQuizData(quizData)) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  try {
    // Ensure the directory exists before attempting to write the file
    ensureDirectoryExistence(QUIZ_FILE_PATH);

    // Save quiz data to file (ensure writing is complete before responding)
    const dataToSave = JSON.stringify(quizData, null, 2);
    
    // Writing to file using promises for cleaner async handling
    await fs.promises.appendFile(QUIZ_FILE_PATH, dataToSave + '\n');

    // Optionally, save the data to MongoDB
    const newQuiz = new Quiz(quizData);
    const savedQuiz = await newQuiz.save();

    // Respond with success message and saved data
    res.send({ 
      message: 'Quiz data saved successfully!',
      quiz: savedQuiz // Optionally include the saved quiz data in the response
    });
  } catch (err) {
    console.error('Error in quiz submission:', err);
    res.status(500).send({ message: 'Error saving data', error: err.message });
  }
};

module.exports = { submitQuiz };
