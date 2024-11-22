import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': { color: '#aab7c4' },
    },
    invalid: { color: '#9e2146' },
  },
  hidePostalCode: true,
};

const Proceed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalAmount } = location.state || {};

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

      setLoading(prev => ({ ...prev, intent: true }));
      setError('');

      try {
        const response = await fetch('http://localhost:3001/api/payment/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            amount: Math.round(totalAmount * 100),
            currency: 'inr',
            metadata: {
              cartItemCount: cart?.length || 0,
            }
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setPaymentIntent({
          clientSecret: data.clientSecret,
          id: data.paymentIntentId
        });
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError('Failed to initialize payment. Please try again.');
      } finally {
        setLoading(prev => ({ ...prev, intent: false }));
      }
    };

    if (totalAmount > 0) {
      createPaymentIntent();
    }
  }, [totalAmount, cart?.length]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements || !paymentIntent) {
      return;
    }

    setLoading(prev => ({ ...prev, payment: true }));
    setError('');
    setPaymentStatus('');

    try {
      // Create payment method
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (methodError) {
        throw new Error(methodError.message);
      }

      // Confirm payment
      const confirmResponse = await fetch('http://localhost:3001/api/payment/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          paymentMethodId: paymentMethod.id,
        }),
      });

      const confirmResult = await confirmResponse.json();

      if (!confirmResult.success) {
        throw new Error(confirmResult.message);
      }

      // Handle different payment intent statuses
      if (confirmResult.requiresAction) {
        const { error: confirmError } = await stripe.confirmCardPayment(
          paymentIntent.clientSecret
        );
        if (confirmError) {
          throw new Error(confirmError.message);
        }
      }

      setPaymentStatus('Payment successful! Redirecting...');
      // Redirect to success page after short delay
      setTimeout(() => {
        navigate('/thank-you', { 
          state: { 
            orderId: confirmResult.paymentIntent.id,
            amount: totalAmount 
          }
        });
      }, 2000);

    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, payment: false }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Your Payment</h1>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl mb-4">Order Summary</h2>
        <p className="text-lg font-semibold mb-4">
          Total Amount: ₹{totalAmount?.toFixed(2)}
        </p>
        <div className="max-h-40 overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Product</th>
                <th className="text-right">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item, index) => (
                <tr key={index}>
                  <td className="py-2">{item.name}</td>
                  <td className="text-right">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {loading.intent ? (
        <div className="text-center py-4">
          <p>Initializing payment...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white p-4 border rounded-md">
            <CardElement options={cardElementOptions} />
          </div>
          
          <button
            type="submit"
            disabled={loading.payment || !stripe || !paymentIntent}
            className={`w-full py-3 px-4 rounded-md text-white font-medium 
              ${loading.payment || !paymentIntent
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading.payment ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {paymentStatus && !error && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
          {paymentStatus}
        </div>
      )}
    </div>
  );
};

export default Proceed;