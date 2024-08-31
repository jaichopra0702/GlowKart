import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'; // Ensure this CSS file is correctly linked

const Cart = ({ cart, removeFromCart }) => {
  // Calculate total amount and total number of products
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalProducts = cart.reduce((total, item) => total + item.quantity, 0);

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
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => removeFromCart(item)} className="remove-button">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
      <Link to="/" className="back-to-shop">Back to Shop</Link>
    </div>
  );
};

export default Cart;








// src/components/Cart.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Cart = ({ cart, removeFromCart }) => {
//   return (
//     <div className="cart-container">
//       <h1>Your Cart</h1>
//       {cart.length > 0 ? (
//         <div className="cart-items">
//           {cart.map((item, index) => (
//             <div key={index} className="cart-item">
//               <h2>{item.name}</h2>
//               <p>Price: ₹{item.price}</p>
//               <p>Quantity: {item.quantity}</p>
//               <button onClick={() => removeFromCart(item.name)}>Remove</button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//       <Link to="/">Back to Shop</Link>
//     </div>
//   );
// };

// export default Cart;