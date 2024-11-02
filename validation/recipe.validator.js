const { body } = require('express-validator');
const { idValidation } = require('../validation/IDValidation');

const nameValidation = () => [
    body('name')
        .notEmpty().withMessage("Recipe must have a name")
        .isString().withMessage("Recipe name must be a string")
        .isLength({ min: 3, max: 180 }).withMessage("Recipe name must be between 3 and 180 characters long")
];

const ingredientsValidation = () => [
    body('ingredients')
        .isArray({ min: 1 }).withMessage("Recipe must have at least one ingredient")
        .custom((ingredients) => {
            const hasDuplicates = new Set(ingredients.map(String)).size !== ingredients.length;
            if (hasDuplicates) {
                throw new Error("Duplicate ingredients are not allowed.");
            }
            return true;
        }),
    body('ingredients.*').isMongoId().withMessage("Each ingredient must be a valid ID")
];

const prepLevelValidation = () => [
    body('prepLevel')
        .notEmpty().withMessage("Recipe must have a preparation level")
        .isIn(["easy", "medium", "hard"]).withMessage("Preparation level must be either 'easy', 'medium', or 'hard'")
];

const servingsValidation = () => [
    body('servings')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage("Servings must be a number between 1 and 100")
];

const categoriesValidation = () => [
    body('categories')
        .isArray({ min: 1 }).withMessage("Recipe must belong to at least one category")
        .custom((categories) => {
            const allowedCategories = ["Breakfast", "Lunch", "Snack", "Dinner", "Dessert"];
            for (const category of categories) {
                if (!allowedCategories.includes(category)) {
                    throw new Error("Category must be one of: Breakfast, Lunch, Snack, Dinner, Dessert");
                }
            }
            return true;
        })
];

const tagsValidation = () => [
    body('tags')
        .isArray({ min: 1 }).withMessage("Recipe must have at least one tag")
        .custom((tags) => {
            const allowedTags = ["Beef", "Bread", "Soup", "Sandwich", "Vegetarian", "Fish", "Chicken"];
            for (const tag of tags) {
                if (!allowedTags.includes(tag)) {
                    throw new Error("Tag must be one of: Beef, Bread, Soup, Sandwich, Vegetarian, Fish, Chicken");
                }
            }
            return true;
        })
];

const totalPrepTimeValidation = () => [
    body('totalPrepTime')
        .notEmpty().withMessage("Total preparation time is required")
        .isInt({ min: 1, max: 1440 }).withMessage("Preparation time must be between 1 and 1440 minutes")
];

const inactiveTimeValidation = () => [
    body('inactiveTime')
        .optional()
        .isInt({ min: 0, max: 525600 }).withMessage("Inactive time must be between 0 and 525600 minutes (1 year)")
];

const directionsValidation = () => [
    body('directions')
        .isArray({ min: 1 }).withMessage("Directions are required")
        .custom((directions) => {
            if (directions.some(direction => typeof direction !== 'string')) {
                throw new Error("Each direction must be a string");
            }
            return true;
        })
];

const pictureURLValidation = () => [
    body('pictureURL')
        .optional()
        .isURL().withMessage("Must be a valid URL")
];

const videoURLValidation = () => [
    body('videoURL')
        .optional()
        .isURL().withMessage("Must be a valid URL")
];

const sourceValidation = () => [
    body('source')
        .optional()
        .isString().withMessage("Source must be a string")
];

const commentsValidation = () => [
    body('comments')
        .optional()
        .isString().withMessage("Comments must be a string")
];

const recipeCreateValidation = [
    ...nameValidation(),
    ...ingredientsValidation(),
    ...prepLevelValidation(),
    ...servingsValidation(),
    ...categoriesValidation(),
    ...tagsValidation(),
    ...totalPrepTimeValidation(),
    ...inactiveTimeValidation(),
    ...directionsValidation(),
    ...pictureURLValidation(),
    ...videoURLValidation(),
    ...sourceValidation(),
    ...commentsValidation()
];
const recipeUpdateValidation = [
    ...idValidation(),
    ...recipeCreateValidation,
];

module.exports = {
    recipeCreateValidation,
    recipeUpdateValidation,
};
