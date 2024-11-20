import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart, setCart] = useState(cartFromLocalStorage);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (product) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== product.id)
    );
  };

  // Update item quantity in cart
  const updateCartItemQuantity = (product, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: Math.max(quantity, 1) }
          : item
      )
    );
  };

  // Save the cart to localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Get total items in the cart
  const getCartItemCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // CartButton component (keep as it is)
  const CartButton = () => {
    const { cart } = useContext(CartContext);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
      <button style={{ position: 'relative', padding: '10px 20px' }}>
        🛒 Cart
        {totalItems > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '5px 10px',
              fontSize: '12px',
            }}
          >
            {totalItems}
          </span>
        )}
      </button>
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemQuantity, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
