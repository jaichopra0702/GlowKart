// src/components/Navbar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './app.css'; 

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="logo">
//         <img src="https://via.placeholder.com/100x50?text=Logo" alt="Logo" />
//       </div>
//       <ul className="nav-links">
//         <li><Link to="/">Shop</Link></li>
//         <li><a href="#">Rewards</a></li>
//         <li><a href="#">Our Story</a></li>
//         <li><a href="#">More</a></li>
//       </ul>
//       <div className="nav-actions">
//         <a href="#" className="login">Login</a>
//         <div className="cart">
//           <Link to="/cart">Cart</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };




import React from 'react';
import { Link } from 'react-router-dom';
import './app.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="https://via.placeholder.com/100x50?text=Logo" alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Shop</Link></li>
        <li><a href="#">Rewards</a></li>
        <li><a href="#">Our Story</a></li>
        <li><a href="#">More</a></li>
      </ul>
      <div className="nav-actions">
        <Link to="/login" className="login">Login</Link>
        <Link to="/signup" className="signup">Sign Up</Link>
        <div className="cart">
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

