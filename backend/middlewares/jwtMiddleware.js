const session = require('express-session');
const validateToken = (req, res, next) => {
    // Check if user is authenticated via session
    if (req.session && req.session.userId) {
        // Session exists and has a user ID
        next();
    } else {
        // No active session
        res.status(401).json({ 
            error: 'Unauthorized. Please log in.' 
        });
    }
};

const generateToken = (user) => {
    // This would typically be handled by express-session automatically
    // But you can add custom session data if needed
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.role = user.role;
};

module.exports = {
    validateToken,
    generateToken
};