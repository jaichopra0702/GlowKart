import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css"; // Or whatever your global styles file is named
import { CartProvider } from "./Components/CartContext";
import { AuthProvider } from './AuthContext'; // Import the provider

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      {/* Wrap your App with both the CartProvider and AuthProvider */}
        <CartProvider>
          <App />
        </CartProvider>
    </Router>
  </React.StrictMode>
);
