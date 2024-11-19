const Quiz = require('../models/Quiz');
const Product = require('../models/Product'); // Assuming you have a Product model for product recommendations

// Handle quiz submission
const submitQuiz = async (req, res) => {
  try {
    console.log('Received Quiz Data:', req.body);

    const { name, email, phone, answers, category, recommendations } = req.body;

    // Validate required fields
    if (!name || !email || !answers || !category) {
      return res.status(400).json({ 
        error: "Missing required fields",
        receivedData: req.body
      });
    }

    const newQuiz = new Quiz({
      name,
      email,
      phone,
      answers,
      category,
      recommendations
    });

    await newQuiz.save();
    console.log('Quiz Saved Successfully:', newQuiz);

    res.status(201).json({ 
      success: true, 
      message: 'Quiz submitted successfully', 
      quiz: newQuiz 
    });

  } catch (error) {
    console.error('Quiz Submission Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error submitting quiz', 
      details: error.message 
    });
  }
};

module.exports = { submitQuiz };
