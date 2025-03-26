const jwt = require('jsonwebtoken');

const optionalAuth = (req, res, next) => {
    // Attempt to retrieve token from Authorization header or cookies
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.token;
    
    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        console.log("Invalid token, proceeding without authentication");
    }
    
    next();
};

module.exports = optionalAuth;
