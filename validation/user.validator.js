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
        .isLength({ max: 254 }).withMessage("Email must be at most 254 characters long"), // Optional: Limit email length
];

const passwordValidation = () => [
    check('password')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6, max: 180 }).withMessage("Password must be between 6 and 180 characters long"),
];

const idValidation = () => [
    check('id').isMongoId().withMessage("Invalid MongoDB ID format"),
];

const recipesValidation = () => [
    body('recipes')
        .isArray({ min: 1 }).withMessage("Recipes must be an array with at least one recipe")
        .custom((value) => {
            const hasDuplicates = new Set(value.map(String)).size !== value.length;
            if (hasDuplicates) {
                throw new Error("Duplicate recipes are not allowed.");
            }
            return true;
        }),
    body('recipes.*').isMongoId().withMessage("Each recipe must be a valid ID"),
];

const changePasswordValidation = () => [
    check('oldPassword')
        .notEmpty()
        .withMessage("Old password is required"),
    check('newPassword')
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters long")
        .isStrongPassword()
        .withMessage("New password should contain lowercase, uppercase, number, and special characters"),
];

const getUserByIdValidation = [
    ...idValidation(),
];

const deleteUserByIdValidation = [
    ...idValidation(),
];

const deleteRecipesValidation = [
    ...idValidation(),
    ...recipesValidation(),
];

const addRecipeValidation = [
    // ...idValidation(),
];

const createUserValidation = [
    ...usernameValidation(),
    ...emailValidation(),
    ...passwordValidation(),
    ...recipesValidation(),
];

module.exports = {
    createUserValidation,
    getUserByIdValidation,
    deleteUserByIdValidation,
    changePasswordValidation,
    deleteRecipesValidation,
    addRecipeValidation,
};
