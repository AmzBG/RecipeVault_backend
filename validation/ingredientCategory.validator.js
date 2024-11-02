const { body } = require('express-validator');
const { idValidation } = require('../validation/IDValidation');

const nameValidation = () => [
    body('name')
        .notEmpty().withMessage("Category must have a name")
        .isString().withMessage("Category name must be a string")
        .isLength({ min: 2, max: 50 }).withMessage("Category name must be between 2 and 50 characters long")
];

const categoryUpdateValidation = [
    ...idValidation(),
    ...nameValidation(),
];

module.exports = {
    nameValidation,
    categoryUpdateValidation,
};
