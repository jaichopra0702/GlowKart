// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const productRoutes = require('./routes/productRoutes');


// const app = express(); // Initialize Express app

// // Middleware to handle CORS
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };
// app.use(cors(corsOptions));

// // Middleware to parse JSON requests
// app.use(express.json());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/my-shop', { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true 
// }).then(() => console.log("MongoDB connected"))
//   .catch(err => console.log("MongoDB connection error: ", err));

// // Use the product routes
// app.use('/api/products', productRoutes);

// // Start the server
// const PORT = process.env.PORT || 5001;
// app.listen(5001, () => console.log('Server is running on port 5001'));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const productRoutes = require('./routes/productRoutes'); // Your existing product routes

const app = express(); // Initialize Express app

// Middleware to handle CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/my-shop', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error: ", err));

// Mock user data (in a real application, you'd use a database)
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: bcrypt.hashSync('password123', 10), // hashed password
  }
];
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password and add the user to the mock database
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User created successfully' });
});


// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Check if the password is correct
  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate a token (using a secret key)
  const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({ token });
});

// Use the product routes
app.use('/api/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
