const express = require('express');
const session = require('express-session');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Config and Routes
const connectDb = require('./config/dbConnection');
const productRoutes = require('./routes/productRoutes');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config(); // Load environment variables
connectDb(); // Connect to the database

// Stripe Configuration
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

// File Paths
const FILE_PATH = path.join(__dirname, 'record1.txt');
const QUIZ_FILE_PATH = path.join(__dirname, 'record.txt');

app.use(
  session({
    secret: process.env.PRIVATE_KEY, // Replace with a secure secret
    resave: false, // Prevents resaving the session if not modified
    saveUninitialized: false, // Doesn't save an uninitialized session
    cookie: {
      httpOnly: true, // Prevent access from client-side JavaScript
      secure: false, // Set true in production with HTTPS
      maxAge: 1000 * 60 * 60, // 1-hour expiration
    },
  })
);

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(bodyParser.json()); // Parse incoming JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use('/api/quiz', quizRoutes);
app.use('/api/products', productRoutes);
app.use('/user', userRoutes);
app.use('/api/payment', paymentRoutes);

//cors
app.use(cors());

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
