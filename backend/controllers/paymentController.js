const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
exports.createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount in paise for INR (example: 1000 = ₹10)
      currency: currency,
      payment_method_types: ['card'],
    });
    console.log('PAYMENT INTENT', paymentIntent);
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id, // Ensure you're sending this back correctly
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      message: 'Unable to create payment intent',
      error: error.message,
    });
  }
};

// // Create payment method for backend testing
// exports.createPaymentMethod = async (req, res) => {
//   const { cardNumber, expMonth, expYear, cvc } = req.body;

//   try {
//     // Create the payment method using test card details
//     const paymentMethod = await stripe.paymentMethods.create({
//       type: 'card',
//       card: {
//         number: cardNumber,
//         exp_month: expMonth,
//         exp_year: expYear,
//         cvc: cvc,
//       },
//     });

//     // Return the paymentMethodId to the client
//     res.status(200).json({
//       paymentMethodId: paymentMethod.id,
//     });
//   } catch (error) {
//     console.error('Error creating payment method:', error);
//     res.status(500).json({
//       message: 'Unable to create payment method',
//       error: error.message,
//     });
//   }
// };

// Confirm payment intent

exports.confirmPayment = async (req, res) => {
  const { paymentIntentId, paymentMethodId } = req.body; // Receive these values from the frontend

  try {
    if (!paymentMethodId) {
      return res
        .status(400)
        .json({ success: false, message: 'Payment method is required.' });
    }

    // Confirm paymentIntent with paymentMethodId
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId, // Corrected here: pass paymentMethodId, not paymentIntentId
    });

    if (paymentIntent.status === 'succeeded') {
      res
        .status(200)
        .json({ success: true, message: 'Payment succeeded', paymentIntent });
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Payment failed', paymentIntent });
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error confirming payment',
      error: error.message,
    });
  }
};
