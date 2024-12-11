import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Procedd.css';
const apiUrl = 'https://glowkart-backend-nqnn.onrender.com'; // Correct backend URL
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': { color: '#aab7c4' },
    },
    invalid: { color: '#9e2146' },
  },
  hidePostalCode: true, // This hides the ZIP/postal code input
};

const Proceed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount } = location.state || {};

  const [paymentIntent, setPaymentIntent] = useState(null);
  const [loading, setLoading] = useState({
    intent: false,
    payment: false,
  });
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!totalAmount) return;

      setLoading((prev) => ({ ...prev, intent: true }));
      setError('');

      try {
        // const response = await fetch(
        //   `${apiUrl}/api/payment/create`,
        //   {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     credentials: 'include',
        //     body: JSON.stringify({
        //       amount: Math.round(totalAmount * 100),
        //       currency: 'inr',
        //     }),
        //   }
        // );

        const response = await fetch(`${apiUrl}/api/payment/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            amount: Math.round(totalAmount * 100),
            currency: 'inr',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setPaymentIntent({
          clientSecret: data.clientSecret,
          id: data.paymentIntentId,
        });
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError('Failed to initialize payment. Please try again.');
      } finally {
        setLoading((prev) => ({ ...prev, intent: false }));
      }
    };

    if (totalAmount > 0) {
      createPaymentIntent();
    }
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !paymentIntent) {
      return;
    }

    setLoading((prev) => ({ ...prev, payment: true }));
    setError('');
    setPaymentStatus('');

    try {
      const { error: methodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        });

      if (methodError) {
        throw new Error(methodError.message);
      }

      const confirmResponse = await fetch(
        `${apiUrl}/api/payment/confirm-payment`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            paymentMethodId: paymentMethod.id,
          }),
        }
      );

      const confirmResult = await confirmResponse.json();

      if (!confirmResult.success) {
        throw new Error(confirmResult.message);
      }

      if (confirmResult.requiresAction) {
        const { error: confirmError } = await stripe.confirmCardPayment(
          paymentIntent.clientSecret
        );
        if (confirmError) {
          throw new Error(confirmError.message);
        }
      }

      setPaymentStatus('Payment successful! Redirecting...');
      setTimeout(() => {
        navigate('/thank-you', {
          state: {
            orderId: confirmResult.paymentIntent.id,
            amount: totalAmount,
          },
        });
      }, 2000);
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading((prev) => ({ ...prev, payment: false }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg border border-pink-300">
        <h1 className="text-2xl font-bold text-center text-pink-700 mb-6">
          Complete Your Payment
        </h1>

        <div className="bg-pink-100 p-4 rounded-lg shadow mb-6">
          <p className="text-center font-semibold text-pink-900">
            Total Amount: ₹{totalAmount?.toFixed(2)}
          </p>
        </div>

        {loading.intent ? (
          <div className="text-center py-4">
            <p className="text-pink-600">Initializing payment...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-pink-50 p-4 border border-pink-300 rounded-lg">
              <CardElement options={cardElementOptions} />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading.payment || !stripe || !paymentIntent}
                className={`w-auto py-3 px-4 rounded-md font-medium text-white bg-pink-600 
                  ${loading.payment || !paymentIntent ? 'cursor-not-allowed bg-pink-300' : 'hover:bg-pink-700'}`}
              >
                {loading.payment ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </form>
        )}

        {error && (
          <div className="mt-4 p-4 bg-pink-100 text-pink-700 rounded-md">
            {error}
          </div>
        )}

        {paymentStatus && !error && (
          <div className="mt-4 p-4 bg-pink-50 text-pink-800 rounded-md">
            {paymentStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default Proceed;
