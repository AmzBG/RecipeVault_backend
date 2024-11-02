const express = require('express');
const {
    createIngredientController,
    getAllIngredientsController,
    getIngredientController,
    updateIngredientController,
    deleteIngredientController
} = require('../controllers/ingredient.controller');
const {
    ingredientCreateValidation,
    ingredientUpdateValidation,
} = require('../validation/ingredient.validator');
const { idValidation } = require('../validation/IDValidation');

const router = express.Router();

router.post("/create", ingredientCreateValidation, createIngredientController);
router.get("/getAll", getAllIngredientsController);
router.get("/get/:id", idValidation(), getIngredientController);
router.put("/update/:id", ingredientUpdateValidation, updateIngredientController);
router.delete("/delete/:id", idValidation(), deleteIngredientController);

module.exports = router;