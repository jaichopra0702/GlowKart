const express = require('express');
const { createPaymentIntent } = require('../controllers/paymentController');
const router = express.Router();

// Route to create payment intent
router.post('/create', createPaymentIntent);


module.exports = router;