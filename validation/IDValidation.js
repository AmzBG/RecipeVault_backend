const { check } = require('express-validator');

const idValidation = () => [
    check('id').isMongoId().withMessage("Invalid ID format"),
];

module.exports = {
    idValidation,
};