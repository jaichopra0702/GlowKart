require('dotenv').config(); // This should be at the very top
 // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const productRoutes = require('./routes/productRoutes');
const quizRoutes = require('./routes/quizRoutes');
const User = require('./models/User');
const app = express();
const PORT = process.env.PORT || 5001;  // Use the port from the .env file or fallback to 5001
const JWT_SECRET = process.env.JWT_SECRET;  // Use the JWT_SECRET from the .env file

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Middleware
app.use(cors({ origin: 'http://localhost:3000', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true }));
app.use(bodyParser.json()); // This line is crucial to parse incoming JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error saving user to database' });
  }
});

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});


// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Quiz routes
app.use('/api/quiz', quizRoutes);

// Product routes
app.use('/api/products', productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
