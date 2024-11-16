//quizController.js
const User = require('../models/User');
const Product = require('../models/Product'); // Assuming you have a Product model for product recommendations

// Handle quiz submission
const submitQuiz = async (req, res) => {
  const { name, email, answers, category } = req.body;

  console.log(req.body);  // Debugging: log the request body

  if (!name || !email || !answers || !category) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let user = await User.findOne({ email });
    
    if (user) {
      user.answers = answers;
      user.category = category;

      // Fetch product recommendations based on category
      const products = await Product.find({ category }).limit(5);
      
      // Log the products fetched
      console.log('Fetched products:', products);

      user.recommendations = products.map((product) => product.name);

      await user.save();
      return res.status(200).json({ message: 'Quiz updated successfully', user });
    } else {
      user = new User({
        name,
        email,
        answers,
        category,
      });

      // Fetch product recommendations based on category
      const products = await Product.find({ category }).limit(5);
      
      // Log the products fetched
      console.log('Fetched products:', products);

      user.recommendations = products.map((product) => product.name);

      await user.save();
      return res.status(201).json({ message: 'Quiz submitted successfully', user });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error submitting quiz', details: error.message });
  }
};


module.exports = { submitQuiz };
