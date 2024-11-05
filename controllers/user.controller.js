const { validationResult } = require("express-validator");
const { createUser, getAllUsers, getUser, deleteUser, changePassword } = require("../services/user.service");
const { clearToken } = require("../services/auth.service");
const { deleteAllRecipes } = require("../services/recipe.service");

const createUserController = async (req, res) => {
    // Check if user is already logged in    
    if (req.user) {
        return res.status(403).json({ message: "You are already logged in and cannot create a new account." });
    }

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }
    const user = req.body;

    try {
        const newUser = await createUser(user);
        res.status(200).json({newUser});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }
        });
    }
}

const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({users});    
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }
        });
    }
}

const getUserController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }
    
    try {
        const user = await getUser(req.user.id);
        res.status(200).json({user});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }
        });
    }
}

const deleteUserController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }
    const userID = req.user.id;

    try {
        const user = await deleteUser(userID);
        
        await deleteAllRecipes(userID);

        // and logout
        clearToken(res);
        
        res.status(200).json({user});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }
        });
    }
}

const changePasswordController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await getUser(req.user.id);
        const result = await changePassword({ user, oldPassword, newPassword });
        res.status(200).json({result});
    } catch (err) {
        res.status(400).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }
        });
    }
};

module.exports = {
    createUserController,
    getAllUsersController,
    getUserController,
    deleteUserController,
    changePasswordController,
}