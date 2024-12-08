import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Ensure this CSS file is correctly linked
import { CartContext } from './CartContext'; // Import CartContext
import { getCartData, updateCartQuantity, removeItemFromCart } from '../utils/api'; // Import API utility functions
import axios from 'axios';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartItemQuantity, addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  // Calculate total amount and total number of products
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalProducts = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const cartData = await getCartData(token);
        // Optionally update your context or local state with fetched cart data here
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      }
    };

    fetchCartData();
  }, []); // Empty array means this runs only once when the component mounts

  const handleBackToShop = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleAddToCart = (product) => {
    addToCart(product); // Optimistic UI update
    const token = localStorage.getItem('authToken');
    axios
      .post('http://localhost:5000/api/cart', product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log('Cart updated:', response.data);
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });
  };

  const handleUpdateCartItemQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantity
    updateCartItemQuantity(item, newQuantity);

    const token = localStorage.getItem('authToken');
    updateCartQuantity(token, item.productId, newQuantity)
      .then(response => {
        console.log('Cart updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating cart item:', error);
      });
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item); // Optimistic UI update

    const token = localStorage.getItem('authToken');
    removeItemFromCart(token, item.productId)
      .then(response => {
        console.log('Item removed from cart:', response.data);
      })
      .catch(error => {
        console.error('Error removing item from cart:', error);
      });
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart, totalAmount, totalProducts } }); // Pass cart items along with totalAmount and totalProducts
  };

  
  return (
    <div className="cart-container">
      <h1><u>Your Cart</u></h1>
      {cart.length > 0 ? (
        <>
          <div className="cart-summary">
            <div className="TP">
              <p>Total Products: <strong>{totalProducts}</strong></p>
            </div>
            <div className="TA">
              <p>Total Amount: <strong>₹{totalAmount.toFixed(2)}</strong></p>
            </div>
          </div>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p><b>Price: ₹{item.price}</b></p>
                  <p><b>Quantity:</b> 
                    <button onClick={() => handleUpdateCartItemQuantity(item, item.quantity - 1)} className="quantity-button">-</button>
                    {item.quantity}
                    <button onClick={() => handleUpdateCartItemQuantity(item, item.quantity + 1)} className="quantity-button">+</button>
                  </p>
                  <button onClick={() => handleRemoveFromCart(item)} className="remove-button">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
      <div className='end'>
        
      </div>
      <button onClick={handleBackToShop} className="back-to-shop">Back to Shop</button>
      <button onClick={handleCheckout} className="checkout-button">Check-Out</button>
    </div>

      
      

  );
};

export default Cart;