const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController'); // Adjust path as needed

// Route for creating a payment intent (this is used for initiating payment)
router.post('/create', paymentController.createPaymentIntent);  // Endpoint: POST /api/payment/create

// Route for confirming the payment intent (this is done after the user submits their payment method)
router.post('/confirm-payment', paymentController.confirmPayment);  // Endpoint: POST /api/payment/confirm-payment
 // Endpoint: POST /api/
module.exports = router;
