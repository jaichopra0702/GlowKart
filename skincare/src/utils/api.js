// src/utils/api.js
import axios from 'axios';

// Function to fetch cart data
export const getCartData = (token) => {
  return axios.get('http://localhost:5000/api/cart', {
    headers: {
      Authorization: `Bearer ${token}`,  // Pass token for authentication
    },
  });
};

// Function to update cart item quantity
export const updateCartQuantity = (token, productId, quantity) => {
  return axios.put(
    'http://localhost:5000/api/cart',
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Function to remove an item from the cart
export const removeItemFromCart = (token, productId) => {
  return axios.delete(`http://localhost:5000/api/cart/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};