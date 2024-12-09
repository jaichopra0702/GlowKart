// src/Components/ProceedWithStripe.js
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Proceed from './Proceed';

// Make sure to replace 'your_publishable_key' with your actual Stripe publishable key
const stripePromise = loadStripe(
  'pk_test_51PyvtA03czuQee3J7rVd9ySCVxJZImm9T9QkjXfpjFg4nsVJBO9QVTgbY1tbWVtVJx6ygJvG8q7q0xUD8Z63STm400HIxzx1xw'
);

const ProceedWithStripe = () => (
  <Elements stripe={stripePromise}>
    <Proceed />
  </Elements>
);

export default ProceedWithStripe;
