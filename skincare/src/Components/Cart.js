// Cart.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Components/Cart.css';
import { CartContext } from './CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartItemQuantity } = useContext(CartContext);

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalProducts = cart.reduce((total, item) => total + item.quantity, 0);

  const handleBackToShop = () => {
    navigate(-1);
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart, totalAmount, totalProducts } }); // Pass cart items along with totalAmount and totalProducts
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <div className="cart-summary">
            <p>Total Products: <strong>{totalProducts}</strong></p>
            <p>Total Amount: <strong>₹{totalAmount.toFixed(2)}</strong></p>
          </div>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity:
                    <button onClick={() => updateCartItemQuantity(item, item.quantity - 1)} className="quantity-button">-</button>
                    {item.quantity}
                    <button onClick={() => updateCartItemQuantity(item, item.quantity + 1)} className="quantity-button">+</button>
                  </p>
                  <button onClick={() => removeFromCart(item)} className="remove-button">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
      <button onClick={handleBackToShop} className="back-to-shop">Back to Shop</button>
      <button onClick={handleCheckout} className="checkout-button">Checkout</button>
    </div>
  );
};

export default Cart;