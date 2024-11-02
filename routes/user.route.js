const express = require('express');
const { createUserController, getAllUsersController, getUserController, updateUserController, deleteUserController, loginController, changePasswordController, updateRecipesController } = require('../controllers/user.controller');

const router = express.Router();

router.post("/register", createUserController);
router.post("/login", loginController);
router.post("/cp/:id", changePasswordController);
router.post("/update/:id", updateRecipesController);

router.get("/getAll", getAllUsersController);
router.get("/get/:id", getUserController);
// router.put("/update/:id", updateUserController);
router.delete("/delete/:id", deleteUserController);

module.exports = router;