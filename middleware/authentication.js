const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach the user info to the request
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        res.status(403).json({ message: 'Invalid Token' });
    }
};

module.exports = authenticateToken;