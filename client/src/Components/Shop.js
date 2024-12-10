// src/components/Shop.js
import React, { useState, useEffect } from 'react';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://glowkart-backend.onrender.com/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
