const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Load Stripe with your secret key

module.exports = stripe;
