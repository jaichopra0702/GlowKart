// backend/routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Route to get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

