const express = require('express');
const {
    createIngredientCategoryController,
    getAllIngredientCategoriesController,
    getIngredientCategoryController,
    updateIngredientCategoryController,
    deleteIngredientCategoryController
} = require('../controllers/ingredientCategory.controller');
const {
    nameValidation,
    categoryUpdateValidation
} = require('../validation/ingredientCategory.validator');
const { idValidation } = require('../validation/IDValidation');

const router = express.Router();

router.post("/create", nameValidation(), createIngredientCategoryController);
router.get("/getAll", getAllIngredientCategoriesController);
router.get("/get/:id", idValidation(), getIngredientCategoryController);
router.put("/update/:id", categoryUpdateValidation, updateIngredientCategoryController);
router.delete("/delete/:id", idValidation(), deleteIngredientCategoryController);

module.exports = router;