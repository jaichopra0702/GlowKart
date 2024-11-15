// Checkout.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Proceed from './Proceed';
const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract cart, totalAmount, and totalProducts from location state
  const { cart = [], totalAmount = 0, totalProducts = 0 } = location.state || {};

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: 'auto',
      textAlign: 'center',
    },
    title: {
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    text: {
      fontSize: '1.2rem',
      color: '#555',
    },
    details: {
      fontSize: '1.1rem',
      marginTop: '20px',
    },
    table: {
      width: '100%',
      marginTop: '20px',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#f4f4f4',
      fontSize: '1.1rem',
      padding: '10px',
    },
    tableData: {
      padding: '10px',
      border: '1px solid #ddd',
      textAlign: 'center',
    },
    checkoutButton: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1.1rem',
    },
    disabledButton: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#ccc',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'not-allowed',
      fontSize: '1.1rem',
    },
  };

  const handlePayment = () => {
    // Here you would normally integrate a payment gateway like Stripe, Razorpay, or PayPal
    alert('Proceeding to payment...');
    
    // Pass cart and total amount to the payment page
    navigate('/proceed', {
      state: { cart, totalAmount, totalProducts }
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>
      <p style={styles.text}>
        Thank you for choosing to shop with us. Please complete your payment below:
      </p>

      <div style={styles.details}>
        <p>Total Products: <strong>{totalProducts}</strong></p>
        <p>Total Amount: <strong>₹{totalAmount.toFixed(2)}</strong></p>
      </div>

      {/* Product List Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Product Name</th>
            <th style={styles.tableHeader}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableData}>{item.name}</td>
                <td style={styles.tableData}>{item.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={styles.tableData}>No products in cart.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Payment Button */}
      {cart.length > 0 ? (
        <button style={styles.checkoutButton} onClick={handlePayment}>Proceed to Payment</button>
      ) : (
        <button style={styles.disabledButton} disabled>Proceed to Payment</button>
      )}
    </div>
  );
};

export default Checkout;