const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },  // Reference to the Product model
  quantity: { type: Number, required: true, default: 1 }, // Quantity of the product in the cart
});

// Define the cart schema
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model
  items: [productSchema], // Array of products in the cart
  total: { type: Number, default: 0 }, // Total price of the cart
}, { timestamps: true });  // Automatically track the creation and update time

// Create a Cart model based on the schema
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

// -------------------------------------------------------------------------->

// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to the User
//     items: [
//         {
//             productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }, // Reference to Product
//             quantity: { type: Number, required: true, min: 1 }
//         }
//     ]
// });

// const Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart;
