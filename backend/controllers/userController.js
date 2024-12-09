const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        },
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Add password comparison
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { 
            userId: user._id, 
            username: user.name, 
            isAdmin: user.isAdmin || false
        },
        process.env.PRIVATE_KEY,
        { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
});



// Admin-only: Promote a user to admin
const promoteToAdmin = asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const { userId } = req.body; // Get the ID of the user to promote
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.isAdmin = true; // Set the isAdmin flag to true
    await user.save();

    res.status(200).json({ message: "User promoted to admin", user });
});


const myAccount = asyncHandler(async (req, res) => {
    const userId = req.user.userId; 

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.send(user);
});
  

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.userId); 

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name; 
    user.email = req.body.email || user.email;

    const updatedUser = await user.save(); 

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
    });
});

const changeUserPassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.userId); // Changed from req.user.id to req.user.userId

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to change password' });
    }
};

const createAdminUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const { name, email, password } = req.body;
        
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: 'Missing required fields' 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'Email already registered' 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin user
        const newAdmin = new User({
            name,
            email,
            password: hashedPassword,
            role: 'admin' // Assuming you have a role field
        });

        await newAdmin.save();

        res.status(201).json({ 
            message: 'Admin user created successfully' 
        });
    } catch (error) {
        console.error('Admin creation error:', error);
        res.status(500).json({ 
            message: 'Error creating admin user', 
            error: error.message 
        });
    }
};
  
  module.exports = {
    registerUser,
    loginUser,
    createAdminUser,
    promoteToAdmin,
    myAccount,
    updateUserProfile,
    changeUserPassword
  };