const express = require('express');
const cors = require('cors');
const fs = require('fs');
const connectDb = require("./config/dbConnection");
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
connectDb();

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); // Ensure the file exists

const app = express();
const PORT = process.env.PORT || 5000;
const FILE_PATH = path.join(__dirname, 'record1.txt');
const QUIZ_FILE_PATH = path.join(__dirname, 'record.txt');

app.use(cors());
app.use(express.json());

// MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/my-shop', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// Quiz submission route
app.post('/submit-quiz', (req, res) => {
  const quizData = req.body;
  if (!quizData || !quizData.name || !quizData.email) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  console.log('Received data:', quizData);
  const dataToSave = JSON.stringify(quizData, null, 2);

  fs.appendFile(QUIZ_FILE_PATH, dataToSave + '\n', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send({ message: 'Error saving data' });
    }
    res.send({ message: 'Quiz data saved successfully!' });
  });
});

// Signup route
// app.post('/registeruser', (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

//   fs.readFile(FILE_PATH, 'utf8', (err, data) => {
//     if (err && err.code !== 'ENOENT') return res.status(500).json({ message: 'Error reading file' });

//     let users = data ? JSON.parse(data) : [];
//     const userExists = users.some((u) => u.email === email);
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const newUser = { name, email, password: bcrypt.hashSync(password, 10) };
//     users.push(newUser);

//     fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2), (writeErr) => {
//       if (writeErr) return res.status(500).json({ message: 'Error saving data' });
//       res.status(201).json({ message: 'User created successfully' });
//     });
//   });
// });

//  Login route
// app.post('/loginuser', (req, res) => {
//   const { name,email, password } = req.body;
//   if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

//   fs.readFile(FILE_PATH, 'utf8', (err, data) => {
//     if (err) return res.status(500).json({ message: 'Error reading file' });

//     let users = data ? JSON.parse(data) : [];
//     const user = users.find((u) => u.email === email && bcrypt.compareSync(password, u.password));

//     if (user) {
//       const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
//       res.json({ token });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   });
// });

// Product and User Routes
app.use('/api/products', productRoutes);
app.use('/user', userRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
