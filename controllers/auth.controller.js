const { loginUser } = require("../services/auth.service");
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

module.exports = {
    loginController,
}