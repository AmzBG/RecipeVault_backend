const express = require('express');
const {
    createUserController,
    getAllUsersController,
    getUserController,
    // updateUserController,
    deleteUserController,
    loginController,
    changePasswordController,
    deleteRecipesController,
    addRecipeController,
} = require('../controllers/user.controller');
const {
    createUserValidation,
    getUserByIdValidation,
    deleteUserByIdValidation,
    deleteRecipesValidation,
    changePasswordValidation,
    addRecipeValidation,
} = require('../validation/user.validator');

const router = express.Router();

router.post("/register", createUserValidation, createUserController);
router.post("/login", loginController);
router.post("/cp/:id", changePasswordValidation(), changePasswordController);
router.delete("/:id/delete/recipes", deleteRecipesValidation, deleteRecipesController);
router.post("/:id/add/recipe", addRecipeValidation, addRecipeController); //! no validation here, fix that later 

router.get("/getAll", getAllUsersController);
router.get("/get/:id", getUserByIdValidation, getUserController);
// router.put("/update/:id", updateUserController);
router.delete("/delete/:id", deleteUserByIdValidation, deleteUserController);

module.exports = router;