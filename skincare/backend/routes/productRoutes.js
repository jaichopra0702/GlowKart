const express = require('express');
const router = express.Router();

// Import the controller for handling product routes (assuming it's in productController.js)
const productController = require('../controllers/productController');

// Route for fetching product recommendations based on category
router.get('/recommendations', productController.getRecommendations);

module.exports = router;
