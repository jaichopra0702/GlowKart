// productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Assuming you have this controller

// Route to get recommendations based on category
router.get('/recommendations', productController.getRecommendations);


module.exports = router;
