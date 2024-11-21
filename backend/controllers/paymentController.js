const stripe = require('../config/stripe');

// Handle Payment Intent (for card payments)
const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body; // Amount in smallest unit (e.g., cents for USD)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // e.g., $10.00 => 1000 cents
      currency, // e.g., 'usd'
      payment_method_types: ['card'],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret, // Use this clientSecret on the frontend
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle Webhooks (optional for event handling)


module.exports = { createPaymentIntent };