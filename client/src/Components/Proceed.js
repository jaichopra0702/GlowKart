import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Proceed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalAmount, totalProducts } = location.state || {};

  const [clientSecret, setClientSecret] = useState('');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('http://localhost:3001/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalAmount * 100, // Convert to cents
            currency: 'inr', // Specify your currency
          }),
        });
    
        if (response.ok) {
          const { clientSecret } = await response.json();
          setClientSecret(clientSecret);
        } else {
          const error = await response.json();
          setPaymentStatus(`Error fetching payment intent: ${error.message}`);
        }
      } catch (error) {
        console.error("Error during payment intent request:", error);
        setPaymentStatus('Error during payment request.');
      }
    };

    if (totalAmount) {
      fetchClientSecret();
    }
  }, [totalAmount]);

  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret) {
      return; // Make sure stripe.js has loaded and clientSecret is available
    }

    setIsPaymentProcessing(true);
    setPaymentStatus('Processing payment...');

    try {
      // Confirm the payment with the card element
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error('Payment error:', error);
        setPaymentStatus(`Payment failed: ${error.message}`);
        setIsPaymentProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentStatus('Payment successful!');
        setIsPaymentProcessing(false);
        // You can navigate to a success page here if needed
      }
    } catch (error) {
      console.error('Error during payment confirmation:', error);
      setPaymentStatus(`Payment failed: ${error.message}`);
      setIsPaymentProcessing(false);
    }
  };

  // Navigate to the payment page when the Close button is clicked
  const handleClose = () => {
    navigate('/checkout', { state: { cart, totalAmount, totalProducts } });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Proceed to Payment</h1>
      <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>

      {/* Displaying cart items */}
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Product Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ padding: '10px', border: '1px solid #ddd' }}>No products in cart.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Close Button to redirect */}
      <button
        style={{ padding: '10px 20px', backgroundColor: '#f44336', color: '#fff', marginTop: '20px' }}
        onClick={handleClose}
      >
        Close and Proceed to Payment
      </button>

      {/* Card Element for payment */}
      {clientSecret && (
        <div>
          <CardElement />
          <button
            style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', marginTop: '20px' }}
            onClick={handlePayment}
            disabled={isPaymentProcessing}
          >
            {isPaymentProcessing ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      )}

      {/* Payment Status */}
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

// Wrap the Proceed page with Elements provider to handle Stripe
// const ProceedWithStripe = () => (
//   <Elements stripe={stripePromise}>
//     <Proceed />
//   </Elements>
// );

export default Proceed;