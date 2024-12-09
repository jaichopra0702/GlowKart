const asyncHandler = require("express-async-handler");
const session = require('express-session');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const promoteToAdmin = asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.isAdmin = true;
    await user.save();

    res.status(200).json({ message: "User promoted to admin", user });
});

// Create an admin user
const createAdminUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "Admin user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const adminUser = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: true,
    });

    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debug log

    // Return the created admin user details without the token
    res.status(201).json({
        message: "Admin user created successfully",
        user: {
            id: adminUser._id,
            name: adminUser.name,
            email: adminUser.email,
            isAdmin: adminUser.isAdmin,
        },
    });
});

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

   // No password checking, directly create a token
   const token = jwt.sign(
    { 
        userId: user._id, 
        username: user.name, 
        isAdmin: user.isAdmin || false // Include isAdmin flag
    },
    process.env.PRIVATE_KEY,
    { expiresIn: "1h" }
);
res.status(200).json({ message: "Login successful", token });


    // Create a stateful session
    req.session.userId = user._id;
    req.session.userName = user.name;

    res.status(200).json({ 
        message: "Login successful", 
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
});

const logoutUser = asyncHandler(async (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Could not log out, please try again" });
        }
        
        // Clear the session cookie
        res.clearCookie('connect.sid'); // Default session cookie name
        res.status(200).json({ message: "Logged out successfully" });
    });
});
const myAccount = asyncHandler(async (req, res) => {
    // Assuming the session ID is automatically set when the user is logged in
    const userId = req.session.userId;  // Retrieve userId from session

    if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId);  // Find the user based on the session userId

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.send(user);
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.session.userId;  // Retrieve userId from session

    if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields with the request body data or leave them unchanged if not provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
    });
});
const getAllUsers = asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const users = await User.find({}).select("-password"); // Exclude passwords
    res.status(200).json(users);
});
// Change user password
const changeUserPassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.session.userId;  // Retrieve userId from session

    if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId);  // Find the user based on the session userId

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
});


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    myAccount,
    updateUserProfile,
    changeUserPassword,
    getAllUsers,
    promoteToAdmin,
    createAdminUser
};