const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const productRoutes = require('./routes/productRoutes'); // Ensure this path is correct for your project
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = process.env.PORT || 5001;
const FILE_PATH = path.join(__dirname, 'record1.txt');
const QUIZ_FILE_PATH = path.join(__dirname, 'record.txt');

// Middleware
app.use(cors({ origin: 'http://localhost:3000', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true }));
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/my-shop')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));
// Mock user data (in a real application, this would be stored in a database)
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: bcrypt.hashSync('password123', 10),
  }
];

// Utility functions
const validateQuizData = (data) => {
  return data && typeof data === 'object' && data.hasOwnProperty('name') && data.hasOwnProperty('email');
};

// Routes

// Quiz submission route
app.post('/submit-quiz', (req, res) => {
  const quizData = req.body;
  if (!validateQuizData(quizData)) return res.status(400).send({ message: 'Invalid data' });

  console.log("Received data:", quizData);
  const dataToSave = JSON.stringify(quizData, null, 2);

  fs.appendFile(QUIZ_FILE_PATH, dataToSave + '\n', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send({ message: 'Error saving data' });
    }
    res.send({ message: 'Quiz data saved successfully!' });
  });
});

app.get('/submit-quiz', (req, res) => {
  res.send("This endpoint only accepts POST requests with quiz data.");
});

// Sign up route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') return res.status(500).json({ message: 'Error reading file' });

    let users = data ? JSON.parse(data) : [];
    const userExists = users.some(u => u.email === email);
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newUser = { name, email, password: bcrypt.hashSync(password, 10) };
    users.push(newUser);

    fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ message: 'Error saving data' });
      res.status(201).json({ message: 'User created successfully' });
    });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading file' });

    let users = data ? JSON.parse(data) : [];
    const user = users.find(u => u.email === email && bcrypt.compareSync(password, u.password));

    if (user) {
      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

// Product routes
app.use('/api/products', productRoutes);

//cart routes
app.use('/api/cart',cartRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/my-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});