// const express = require('express');
// const session = require('express-session');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');

// // Config and Routes
// const connectDb = require('./config/dbConnection');
// const productRoutes = require('./routes/productRoutes');
// const quizRoutes = require('./routes/quizRoutes');
// const userRoutes = require('./routes/userRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');

// dotenv.config(); // Load environment variables
// connectDb(); // Connect to the database

// // Stripe Configuration
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const app = express();
// const PORT = process.env.PORT || 3001;

// // File Paths
// const FILE_PATH = path.join(__dirname, 'record1.txt');
// const QUIZ_FILE_PATH = path.join(__dirname, 'record.txt');



// const allowedOrigins = ['https://glowkart-frontend-abj7.onrender.com'];
// app.use(cors({
//     origin: allowedOrigins,
//     credentials: true,
// }));


// app.use(
//   session({
//     secret: process.env.PRIVATE_KEY, // Replace with a secure secret
//     resave: false, // Prevents resaving the session if not modified
//     saveUninitialized: false, // Doesn't save an uninitialized session
//     cookie: {
//       httpOnly: true, // Prevent access from client-side JavaScript
//       secure: false, // Set true in production with HTTPS
//       maxAge: 1000 * 60 * 60, // 1-hour expiration
//     },
//   })
// );

// // Middleware
// // app.use(
// //   cors({
// //     origin: 'http://localhost:3000',
// //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// //     credentials: true,
// //   })
// // );



// app.use(
//   cors({
//     origin: [
//       'https://glowkart-frontend-abj7.onrender.com', // Deployed frontend
//     ],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true, // If cookies or authentication tokens are used
//   })
// );


// app.use(bodyParser.json()); // Parse incoming JSON
// app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// // Routes
// app.use('/api/quiz', quizRoutes);
// app.use('/api/products', productRoutes);
// app.use('/user', userRoutes);
// app.use('/api/payment', paymentRoutes);

// //cors
// app.use(cors());

// // Server Start
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Routes
const connectDb = require('./config/dbConnection');
const productRoutes = require('./routes/productRoutes');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Initialize app and dotenv
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
connectDb();

// Middleware
// CORS to allow frontend access
const allowedOrigins = ['https://glowkart-frontend-abj7.onrender.com'];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session management
app.use(
  session({
    secret: process.env.PRIVATE_KEY || 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true, // Enable HTTPS in production
      maxAge: 1000 * 60 * 60, // 1-hour expiration
    },
  })
);

// Force HTTPS redirect in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Routes
app.use('/api/quiz', quizRoutes);
app.use('/api/products', productRoutes);
app.use('/user', userRoutes);
app.use('/api/payment', paymentRoutes);

// Fallback for unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on https://glowkart-backend-nqnn.onrender.com`);
});