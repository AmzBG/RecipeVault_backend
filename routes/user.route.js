const express = require('express');
const {
    getAllUsersController,
    getUserController,
    deleteUserController,
    changePasswordController,
    deleteRecipesController,
    addRecipeController,
} = require('../controllers/user.controller');
const {
    recipesValidation,
    changePasswordValidation,
} = require('../validation/user.validator');
const { recipeCreateValidation } = require('../validation/recipe.validator');

const router = express.Router();

router.post("/cp", changePasswordValidation(), changePasswordController);
router.delete("/delete/recipes", recipesValidation(), deleteRecipesController);
router.post("/add/recipe", recipeCreateValidation, addRecipeController);

router.get("/getAll", getAllUsersController);
router.get("/get", getUserController);
router.delete("/delete", deleteUserController);

module.exports = router;