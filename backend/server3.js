const express = require('express');
const cors = require('cors');
const fs = require('fs');
const connectDb = require("./config/dbConnection");
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const productRoutes = require('./routes/productRoutes');
const quizRoutes = require('./routes/quizRoutes');
dotenv.config();
connectDb();


const userRoutes = require('./routes/userRoutes'); // Ensure the file exists

const app = express();
const PORT = process.env.PORT || 5000;
const FILE_PATH = path.join(__dirname, 'record1.txt');
const QUIZ_FILE_PATH = path.join(__dirname, 'record.txt');

app.use(cors({ origin: 'http://localhost:3000', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true }));
app.use(bodyParser.json()); // This line is crucial to parse incoming JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));


// Product and User Routes
app.use('/api/quiz', quizRoutes);

// Product routes
app.use('/api/products', productRoutes);
app.use('/user', userRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
