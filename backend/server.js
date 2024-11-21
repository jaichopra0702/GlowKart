const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;
console.log("Starting")

app.use(cors());
app.use(bodyParser.json());

// Validate the incoming data
const validateQuizData = (data) => {
  // Adjust the validation based on your quiz data structure
  if (data && typeof data === 'object') {
    // Example validation: Check if required fields are present
    return data.hasOwnProperty('name') && data.hasOwnProperty('email');
  }
  return false;
};

// Handle POST request to submit quiz data
app.post('/submit-quiz', (req, res) => {
  const quizData = req.body;

  if (!validateQuizData(quizData)) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  console.log("Received data:", quizData);

  const dataToSave = JSON.stringify(quizData, null, 2);
  const filePath = path.join(__dirname, 'record.txt');

  fs.appendFile(filePath, dataToSave + '\n', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send({ message: 'Error saving data' });
    }

    res.send({ message: 'Quiz data saved successfully!' });
  });
});

// Handle GET request to provide information about POST endpoint
app.get('/submit-quiz', (req, res) => {
  res.send("This endpoint only accepts POST requests with quiz data.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
