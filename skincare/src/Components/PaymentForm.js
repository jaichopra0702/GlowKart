import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, totalAmount } = location.state || {};

  const [clientSecret, setClientSecret] = useState('');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  // Fetch client secret from the backend on component mount
  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch('http://localhost:5000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount * 100, // Convert to cents
        }),
      });

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    };

    if (totalAmount) {
      fetchClientSecret();
    }
  }, [totalAmount]);

  // Handle payment process
  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret) {
      return; // Make sure stripe.js has loaded and clientSecret is available
    }

    setIsPaymentProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setPaymentStatus(`Payment failed: ${error.message}`);
      setIsPaymentProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentStatus('Payment successful!');
      setIsPaymentProcessing(false);
    }
  };

  // Navigate to the thank you page on successful payment
  const redirectToThankYou = () => {
    navigate('/thank-you');
  };

  return (
    <div className="payment-form-container">
      <h1>Complete Your Payment</h1>
      <p className="total-amount">Total Amount: ₹{totalAmount.toFixed(2)}</p>

      <div className="cart-summary">
        <h3>Your Cart</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart && cart.length > 0 ? (
              cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No products in cart</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {clientSecret && (
        <div className="payment-form">
          <CardElement className="card-element" />
          <button
            className="payment-button"
            onClick={handlePayment}
            disabled={isPaymentProcessing}
          >
            {isPaymentProcessing ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      )}

      {paymentStatus && (
        <div className="payment-status">
          <p>{paymentStatus}</p>
          {paymentStatus === 'Payment successful!' && (
            <button className="thank-you-button" onClick={redirectToThankYou}>
              Go to Thank You Page
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        .payment-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .payment-form-container h1 {
          font-size: 28px;
          margin-bottom: 10px;
          color: #333;
        }

        .total-amount {
          font-size: 18px;
          margin-bottom: 20px;
          color: #555;
        }

        .cart-summary {
          margin-bottom: 30px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #fff;
        }

        .cart-summary table {
          width: 100%;
          margin-top: 10px;
          border-collapse: collapse;
        }

        .cart-summary th,
        .cart-summary td {
          padding: 8px;
          border: 1px solid #ddd;
          text-align: center;
        }

        .card-element {
          margin: 20px 0;
        }

        .payment-button {
          background-color: #4CAF50;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          width: 100%;
          font-size: 16px;
        }

        .payment-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .payment-status {
          margin-top: 20px;
        }

        .payment-status p {
          font-size: 18px;
          color: #d9534f;
        }

        .thank-you-button {
          background-color: #007bff;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }

        .thank-you-button:hover {
          background-color: #0056b3;
        }

        @media (max-width: 768px) {
          .payment-form-container {
            padding: 15px;
          }

          .payment-button {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentForm;