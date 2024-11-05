const { check, body } = require('express-validator');

const usernameValidation = () => [
    check('username')
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 100 }).withMessage("Username must be between 3 and 100 characters long"),
];

const emailValidation = () => [
    check('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .isLength({ max: 254 }).withMessage("Email must be at most 254 characters long"),
];

const passwordValidation = () => [
    check('password')
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6, max: 180 })
        .withMessage("Password must be between 6 and 180 characters long")
        .isStrongPassword()
        .withMessage("New password should contain lowercase, uppercase, number, and special characters"),
];

const changePasswordValidation = () => [
    check('oldPassword')
        .notEmpty()
        .withMessage("Old password is required"),
    check('newPassword')
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 6, max: 180 })
        .withMessage("New password must be between 6 and 180 characters long")
        .isStrongPassword()
        .withMessage("New password should contain lowercase, uppercase, number, and special characters"),
];

const userValidation = [
    ...usernameValidation(),
    ...emailValidation(),
    ...passwordValidation()
];

module.exports = {
    userValidation,
    changePasswordValidation,
};
