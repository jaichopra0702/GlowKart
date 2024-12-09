const express = require('express');
const { addProduct, updateProduct, deleteProduct, getAllProducts } = require('../controllers/adminController');
const { validateToken, validateAdmin } = require('../middlewares/jwtMiddleware');
const router = express.Router();

// Protect these routes with the validateToken and validateAdmin middlewares
router.post('/add', validateToken, validateAdmin, addProduct);       // Add a product
router.put('/edit/:id', validateToken, validateAdmin, updateProduct); // Edit a product
router.delete('/delete/:id', validateToken, validateAdmin, deleteProduct); // Delete a product
router.get('/products', validateToken, validateAdmin, getAllProducts); // Get all products

module.exports = router;