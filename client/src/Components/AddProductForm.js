import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!productData.name || !productData.price || !productData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Get the token from local storage (assuming you store it after login)
      const token = localStorage.getItem('token');

      // Make API call to add product
      const response = await axios.post(
        'http://localhost:3001/api/admin/add',
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Show success message
      toast.success('Product added successfully!');

      // Reset form after successful submission
      setProductData({
        name: '',
        price: '',
        category: '',
        imageUrl: '',
      });
    } catch (error) {
      // Handle errors
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="All">All Categories</option>
            <option value="SensitiveSkin">Sensitive Skin</option>
            <option value="Acne">Acne & Blemishes</option>
            <option value="DrySkin">Dry Skin</option>
            <option value="OilySkin">Oily Skin</option>
            <option value="TexturedSkin">Textured Skin</option>
            <option value="Pigmentation">Pigmentation</option>
            <option value="CombinationSkin">Combination Skin</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imageUrl"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter image URL"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
