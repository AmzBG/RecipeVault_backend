const express = require('express');
const { loginController, logoutController, verifyUserController } = require('../controllers/auth.controller');
const { createUserController } = require('../controllers/user.controller');
const { userValidation } = require('../validation/user.validator');
const authenticateToken = require('../middleware/authentication');
const optionalAuth = require('../middleware/optionalAuthentication');

const router = express.Router();

router.post("/login", loginController);
router.get("/auth/verify", authenticateToken, verifyUserController)
router.post("/register", optionalAuth, userValidation, createUserController);
router.post("/logout", authenticateToken, logoutController);

module.exports = router;