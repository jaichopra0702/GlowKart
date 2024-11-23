// Checkout.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Proceed from './Proceed';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract cart, totalAmount, and totalProducts from location state
  const { cart = [], totalAmount = 0, totalProducts = 0 } = location.state || {};

  // State to store address details
  const [address, setAddress] = useState({
    name: '',
    addressLine: '',
    city: '',
    state: '',
    zip: '',
  });

  // State to track form submission
  const [isFormValid, setIsFormValid] = useState(false);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Validate address form
  const validateForm = () => {
    const { name, addressLine, city, state, zip } = address;
    if (name && addressLine && city && state && zip) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  // Handle payment (and passing address details)
  const handlePayment = () => {
    if (isFormValid) {
      alert('Proceeding to payment...');
      // Pass cart, total amount, total products, and address to the payment page
      navigate('/proceed', {
        state: { cart, totalAmount, totalProducts, address }
      });
    } else {
      alert('Please fill out all address details.');
    }
  };

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
      backgroundColor: '#f9f9f9',
      border: '2px solid black',
    },
    tableHeader: {
      // backgroundColor: '#ffff00',
      fontSize: '1.1rem',
      padding: '10px',
      border: '1px solid #000000',
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
    formInput: {
      padding: '10px',
      margin: '10px 0',
      width: '100%',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}><u>Checkout</u></h1>
      <p style={styles.text}>
        <b>Thank you for choosing to shop with us. Please complete your payment below:</b>
      </p>
      <b className='add'>Enter Address Details:</b>

      {/* Address Details Form */}
      <div>
        
        <input
          style={styles.formInput}
          type="text"
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleInputChange}
          onBlur={validateForm}
        />
        <input
          style={styles.formInput}
          type="text"
          name="addressLine"
          placeholder="Address Line"
          value={address.addressLine}
          onChange={handleInputChange}
          onBlur={validateForm}
        />
        <input
          style={styles.formInput}
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleInputChange}
          onBlur={validateForm}
        />
        <input
          style={styles.formInput}
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleInputChange}
          onBlur={validateForm}
        />
        <input
          style={styles.formInput}
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={address.zip}
          onChange={handleInputChange}
          onBlur={validateForm}
        />
      </div>

      <div style={styles.details}>
        <p><b>Total Products: </b><strong>{totalProducts}</strong></p>
        <p><b>Total Amount: </b><strong>₹{totalAmount.toFixed(2)}</strong></p>
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
        <button
          style={styles.checkoutButton}
          onClick={handlePayment}
          disabled={!isFormValid}
        >
          Proceed to Payment
        </button>
      ) : (
        <button style={styles.disabledButton} disabled>Proceed to Payment</button>
      )}
    </div>
  );
};

export default Checkout;