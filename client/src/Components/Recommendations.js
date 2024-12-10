import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Recommendations.css';

import { CartContext } from './CartContext';
const apiUrl = 'https://glowkart-backend-nqnn.onrender.com'; // Correct backend URL
const Recommendations = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Extract category from URL query parameter and handle invalid cases
  const urlParams = new URLSearchParams(location.search);
  const selectedCategory = urlParams.get('category') || 'Acne'; // Default to 'Acne'

  useEffect(() => {
    setLoading(true); // Start loading when category changes
    axios
      .get(
        `${apiUrl}/api/products/recommendations?category=${selectedCategory}`
      )
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          setError('No products available for this category');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Something went wrong! Please try again later.');
        setLoading(false);
      });
  }, [selectedCategory]);

  // Handle adding individual product to cart
  const handleAddToCart = (product) => {
    addToCart(product); // Add only the clicked product to the cart
  };

  // Navigate to the cart page
  const handleGoToCart = () => {
    navigate('/cart');
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="recommendations-header">
        <h2>Recommended Products for {selectedCategory}</h2>
        <button className="add-all-to-cart" onClick={handleGoToCart}>
          Go to Cart
        </button>
      </div>

      {/* Display Products */}
      {products.length > 0 ? (
        <div className="product-list1">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.imageUrl}
                alt={product.name}
                onError={(e) => (e.target.src = '/path_to_default_image.jpg')} // Fallback image
              />
              <div className="product-info1">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">Rs {product.price}</p>
                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available for this category</p>
      )}
    </div>
  );
};

export default Recommendations;
