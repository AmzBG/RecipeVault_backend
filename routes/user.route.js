const express = require('express');
const {
    createUserController,
    getAllUsersController,
    getUserController,
    deleteUserController,
    loginController,
    changePasswordController,
    deleteRecipesController,
    addRecipeController,
} = require('../controllers/user.controller');
const {
    userValidation,
    deleteRecipesValidation,
    changePasswordValidation,
} = require('../validation/user.validator');
const { recipeCreateValidation } = require('../validation/recipe.validator');
const { idValidation } = require('../validation/IDValidation');

const router = express.Router();

router.post("/register", userValidation, createUserController);
router.post("/login", loginController);
router.post("/cp/:id", changePasswordValidation(), changePasswordController);
router.delete("/:id/delete/recipes", deleteRecipesValidation, deleteRecipesController);
router.post("/:id/add/recipe", recipeCreateValidation, addRecipeController);

router.get("/getAll", getAllUsersController);
router.get("/get/:id", idValidation(), getUserController);
router.delete("/delete/:id", idValidation(), deleteUserController);

module.exports = router;