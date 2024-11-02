const express = require('express');
const { createIngredientController, getAllIngredientsController, getIngredientController, updateIngredientController, deleteIngredientController } = require('../controllers/ingredient.controller');

const router = express.Router();

router.post("/create", createIngredientController);
router.get("/getAll", getAllIngredientsController);
router.get("/get/:id", getIngredientController);
router.put("/update/:id", updateIngredientController);
router.delete("/delete/:id", deleteIngredientController);

module.exports = router;