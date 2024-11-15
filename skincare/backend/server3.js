require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const productRoutes = require('./routes/productRoutes'); // Ensure this path is correct for your project
const quizRoutes = require('./routes/quizRoutes');
const User = require('./models/User'); // Import the User model
const productController = require('./controllers/productController');
const app = express();
const PORT = process.env.PORT || 5001; // Use the port from the .env file or fallback to 5001
const JWT_SECRET = process.env.JWT_SECRET; // Use the JWT_SECRET from the .env file
const QUIZ_FILE_PATH = './quiz-data.txt'; // Path to store quiz data

// MongoDB Connection


// Middleware
app.use(cors({ origin: 'http://localhost:3000', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true }));
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Utility functions

// Routes

// Quiz submission route
app.use('/api/quiz', quizRoutes); 
app.use('/api/products', productRoutes);

// Sign up route (MongoDB)
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

  try {
    // Check if the user already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error saving user to database' });
  }
});

// Login route (MongoDB)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  try {
    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Product routes
app.use('/api/products', productRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
