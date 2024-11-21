import React from 'react';

const Checkout = ({ cart }) => {
  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add some products before proceeding.</p>
      ) : (
        <div>
          <h3>Order Summary:</h3>
          {cart.map((item, index) => (
            <div key={index} className="checkout-item">
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>
          ))}
          <button>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
