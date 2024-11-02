const express = require('express');
const { createIngredientCategoryController, getAllIngredientCategoriesController, getIngredientCategoryController, updateIngredientCategoryController, deleteIngredientCategoryController } = require('../controllers/ingredientCategory.controller');

const router = express.Router();

router.post("/create", createIngredientCategoryController);
router.get("/getAll", getAllIngredientCategoriesController);
router.get("/get/:id", getIngredientCategoryController);
router.put("/update/:id", updateIngredientCategoryController);
router.delete("/delete/:id", deleteIngredientCategoryController);

module.exports = router;