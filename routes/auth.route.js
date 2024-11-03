const express = require('express');
const { loginController, logoutController } = require('../controllers/auth.controller');
const { createUserController } = require('../controllers/user.controller');
const { userValidation } = require('../validation/user.validator');

const router = express.Router();

router.post("/login", loginController);
router.post("/register", userValidation, createUserController);
router.post("/logout", logoutController);

module.exports = router;