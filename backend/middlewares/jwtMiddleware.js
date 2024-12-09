const jwt = require("jsonwebtoken");

// Generate a new JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.PRIVATE_KEY || 'defaultPrivateKey'); // Fallback for missing PRIVATE_KEY
};

// Validate the token and check for admin privileges
const validateToken = (req, res, next) => {
    const authorization = req.headers.authorization;

    // Check if the token is provided in the header
    if (!authorization) {
        return res.status(401).json({ err: 'Token not available' });
    }

    const token = authorization.split(' ')[1];

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ err: 'Unauthorized user' });
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY || 'defaultPrivateKey'); // Fallback key
        // Attach user data to the request object
        req.user = decodedToken;

        next();
    } catch (err) {
        console.error("Error Occurred:", err.message);
        return res.status(401).json({ err: 'Invalid token' });
    }
};

// Middleware for admin validation
const validateAdmin = (req, res, next) => {
    // Ensure the token validation middleware has run first
    if (!req.user) {
        return res.status(403).json({ err: 'Access denied. No valid token provided.' });
    }

    // Check if the user has admin privileges
    if (!req.user.isAdmin) {
        return res.status(403).json({ err: 'Access denied. Admin privileges required.' });
    }

    next();
};

module.exports = { generateToken, validateToken, validateAdmin };