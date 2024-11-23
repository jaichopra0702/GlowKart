const express = require('express');
const Cart = require('../models/cart'); // Import Cart model
const router = express.Router();

// POST route to add an item to the cart
router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Check if the cart already exists for the user
        let cart = await Cart.findOne({ userId });
        
        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = new Cart({
                userId,
                items: [{ productId, quantity }]
            });
        } else {
            // If the cart exists, update the item or add a new one
            const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            
            if (existingItemIndex !== -1) {
                // If the item already exists in the cart, update its quantity
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                // If it's a new item, add it to the cart
                cart.items.push({ productId, quantity });
            }
        }

        // Save the cart to the database
        await cart.save();
        res.status(200).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding item to cart' });
    }
});

// GET route to retrieve cart data by userId
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving cart' });
    }
});

module.exports = router;