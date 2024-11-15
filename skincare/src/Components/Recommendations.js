import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Recommendations.css';

const Recommendations = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  // Extract category from URL query parameter
  const urlParams = new URLSearchParams(location.search);
  const selectedCategory = urlParams.get('category') || 'Acne'; // Default to 'Acne' if no category is selected

  useEffect(() => {
    // Fetch recommended products based on the selected category
    setLoading(true); // Start loading when category changes
    axios
      .get(`http://localhost:5001/api/products/recommendations?category=${selectedCategory}`)
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Something went wrong! Please try again later.');
        setLoading(false);
      });
  }, [selectedCategory]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Recommended Products for {selectedCategory}</h2>

      {/* Display Products */}
      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                onError={(e) => e.target.src = 'path_to_default_image.jpg'} // Fallback image
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">${product.price}</p> {/* Assuming price is available in the product */}
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
