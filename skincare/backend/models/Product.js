// Product model (models/Product.js)
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  price: Number,
  image: String, // Example: image URL or path
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
