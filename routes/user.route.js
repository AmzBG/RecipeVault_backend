const express = require('express');
const {
    getAllUsersController,
    getUserController,
    deleteUserController,
    changePasswordController
} = require('../controllers/user.controller');
const { changePasswordValidation } = require('../validation/user.validator');

const router = express.Router();

router.post("/cp", changePasswordValidation(), changePasswordController);

router.get("/getAll", getAllUsersController);
router.get("/get", getUserController);
router.delete("/delete", deleteUserController);

module.exports = router;