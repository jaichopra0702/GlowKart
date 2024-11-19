var jwt = require("jsonwebtoken");
const generateToken = (userData) => {
    //creating a new fresh jwt token to provide user for login session management or for authorization purpose...
    return jwt.sign(userData, process.env.PRIVATE_KEY);
}

const validateToken = (req, res, next) => {
    // first we are checking that jwt token is availabe or not
    const authorization = req.headers.authorization;

    //output: 1. Bearer tfghfjehioh(string)
    //output: 2. udjfojdfiod
    //output: 3. 
    //output: 4. token is not created, sent from local or endpoint testing, without token header...

    if (!authorization) {
        return response.status(401).json({ err: 'Token not available' });
    }
    //we are storing token value from headers and splitting to get "Bearer xyz.abc.kjh" to "xyz.abc.kjh"..
    const token = req.headers.authorization.split(' ')[1];

    //token provided is wrong, throw error message "unauthorized user"
    if (!token) {
        return response.status(401).json({ err: 'Unauthorized user' });
    }

    try {
        //in this error handler Try Catch: we are handling of token is validated or verified then move to next middleware or respond back to client
        const validateToken = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = validateToken;
        next();
    } catch (err) {
        console.error("Error Occured: ", err.message);
    }

}

module.exports = {generateToken, validateToken};
