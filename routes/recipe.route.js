const express = require('express');
const { createRecipeController, getAllRecipesController, getRecipeController, updateRecipeController, deleteRecipeController } = require('../controllers/recipe.controller');

const router = express.Router();

router.post("/create", createRecipeController);
router.get("/getAll", getAllRecipesController);
router.get("/get/:id", getRecipeController);
router.put("/update/:id", updateRecipeController);
router.delete("/delete/:id", deleteRecipeController);

module.exports = router;