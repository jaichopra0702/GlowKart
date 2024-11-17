// /utils/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart'; // Your backend URL

// Function to fetch cart data
export const getCartData = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // assuming your backend sends cart data
  } catch (error) {
    console.error('Error fetching cart data:', error);
    throw error;
  }
};

// Function to update the cart item quantity
export const updateCartQuantity = async (token, productId, quantity) => {
  try {
    const response = await axios.put(
      API_URL,
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// Function to remove item from cart
export const removeItemFromCart = async (token, productId) => {
  try {
    const response = await axios.delete(API_URL, {
      data: { productId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};
