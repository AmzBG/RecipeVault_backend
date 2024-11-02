const { body } = require('express-validator');
const { idValidation } = require('../validation/IDValidation');

const nameValidation = () => [
    body('name')
        .notEmpty().withMessage("Ingredient must have a name")
        .isString().withMessage("Ingredient name must be a string")
        .isLength({ min: 2, max: 50 }).withMessage("Ingredient name must be between 2 and 50 characters long")
];

const categoriesValidation = () => [
    body('categories')
        .isArray({ min: 1 }).withMessage("Ingredient must have at least one category")
        .custom((categories) => {
            const hasDuplicates = new Set(categories.map(String)).size !== categories.length;
            if (hasDuplicates) {
                throw new Error("Duplicate categories are not allowed.");
            }
            return true;
        }),
    body('categories.*').isMongoId().withMessage("Each category must be a valid ID")
];

const ingredientCreateValidation = [
    ...nameValidation(),
    ...categoriesValidation(),
];

const ingredientUpdateValidation = [
    ...idValidation(),
    ...ingredientCreateValidation,
];

module.exports = {
    ingredientCreateValidation,
    ingredientUpdateValidation,
};
