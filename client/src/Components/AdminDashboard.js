import React, { useState } from 'react';

const AdminDashboard = ({ onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create the new product object
    const newProduct = {
      name: productName,
      category: category,
      price: parseFloat(price),
      imageUrl: imageUrl,
    };

    // Ensure onAddProduct is a function before calling it
    if (typeof onAddProduct === 'function') {
      onAddProduct(newProduct); // Pass the new product to the parent component
    } else {
      console.error('onAddProduct is not a function');
    }

    // Reset the form
    setProductName('');
    setCategory('');
    setPrice('');
    setImageUrl('');
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminDashboard;