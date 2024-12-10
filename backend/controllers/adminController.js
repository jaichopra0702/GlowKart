const Product = require('../models/Product');

// Add Product
const addProduct = async (req, res) => {
  const { name, price, category, imageUrl } = req.body;

  try {
    // Create a new product
    const newProduct = new Product({
      name,
      price,
      category,
      imageUrl,
    });

    // Save the new product to the database
    await newProduct.save();

    // Send a success response
    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct,
    });
  } catch (error) {
    // Handle errors and send failure response
    res.status(500).json({
      message: 'Error adding product',
      error: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, imageUrl } = req.body;

  try {
    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, category, imageUrl },
      { new: true }
    );

    // If the product is not found, send an error response
    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    // Send a success response with the updated product
    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    // Handle errors and send failure response
    res.status(500).json({
      message: 'Error updating product',
      error: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(id);

    // If the product is not found, send an error response
    if (!deletedProduct) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    // Send a success response
    res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    // Handle errors and send failure response
    res.status(500).json({
      message: 'Error deleting product',
      error: error.message,
    });
  }
};

// Get All Products (for displaying products)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json(products); // Send products as response
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching products',
      error: error.message,
    });
  }
};

module.exports = { addProduct, updateProduct, deleteProduct, getAllProducts };
