const { loginUser, clearToken } = require("../services/auth.service");
const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
    const credentials = req.body;

    try {
        const user = await loginUser(credentials);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true, // Prevents client-side access
            sameSite: 'Strict', // Helps prevent CSRF attacks
            maxAge: 3600000, // 1 hour in milliseconds
            secure: false
        });

        res.status(200).json({ userId: user._id });
    } catch (err) {
        res.status(401).json({ 
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }
        });
    }
};

const logoutController = (req, res) => {
    clearToken(res);
    res.status(200).json({ message: "Logout successful" });
}

const verifyUserController = (req, res) => {
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
        res.status(200).json({ userId: decoded.id });
    });
};


module.exports = {
    loginController,
    logoutController,
    verifyUserController,
}