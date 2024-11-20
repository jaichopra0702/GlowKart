// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // Validate the incoming data
// const validateQuizData = (data) => {
//   // Adjust the validation based on your quiz data structure
//   if (data && typeof data === 'object') {
//     // Example validation: Check if required fields are present
//     return data.hasOwnProperty('name') && data.hasOwnProperty('email');
//   }
//   return false;
// };

// // Handle POST request to submit quiz data
// app.post('/submit-quiz', (req, res) => {
//   const quizData = req.body;

//   if (!validateQuizData(quizData)) {
//     return res.status(400).send({ message: 'Invalid data' });
//   }

//   console.log("Received data:", quizData);

//   const dataToSave = JSON.stringify(quizData, null, 2);
//   const filePath = path.join(__dirname, 'record.txt');

//   fs.appendFile(filePath, dataToSave + '\n', (err) => {
//     if (err) {
//       console.error('Error writing to file:', err);
//       return res.status(500).send({ message: 'Error saving data' });
//     }

//     res.send({ message: 'Quiz data saved successfully!' });
//   });
// });

// // Handle GET request to provide information about POST endpoint
// app.get('/submit-quiz', (req, res) => {
//   res.send("This endpoint only accepts POST requests with quiz data.");
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on Port ${port}`);
// });






const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Product = require('./models/Product');  // Assuming you have a Product model
const Cart = require('./models/cart');  // Cart model
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/my-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Product model route
const productRoutes = require('./routes/productRoutes'); // Assuming product routes are already defined
app.use('/api/products', productRoutes);

// Cart Routes
const cartRoutes = require('./routes/cartRoutes');  // Ensure cartRoutes are correctly implemented
app.use('/api/cart', cartRoutes);

// User Authentication Routes
const userRoutes = require('./routes/userRoutes');  // Define user routes like signup and login
app.use('/api/users', userRoutes);

// Routes to handle cart operations
app.post('/api/cart/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
});

// Fetch user cart
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

// User Authentication Routes - for signup and login
app.post('/api/users/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login route
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const passwordValid = bcrypt.compareSync(password, user.password);
    if (!passwordValid) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
