const express = require('express');
const {
    createRecipeController,
    getAllRecipesController,
    getRecipeController,
    updateRecipeController,
    deleteRecipeController
} = require('../controllers/recipe.controller');
const {
    recipeCreateValidation,
    recipeUpdateValidation,
} = require('../validation/recipe.validator');
const { idValidation } = require('../validation/IDValidation');

const router = express.Router();

router.post("/create", recipeCreateValidation, createRecipeController);
router.get("/getAll", getAllRecipesController);
router.get("/get/:id", idValidation(), getRecipeController);
router.put("/update/:id", recipeUpdateValidation, updateRecipeController);
router.delete("/delete/:id", idValidation(), deleteRecipeController);

module.exports = router;