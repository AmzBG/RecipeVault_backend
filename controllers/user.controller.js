const { validationResult } = require("express-validator");
const { createUser, getAllUsers, getUser, deleteUser, loginUser, changePassword, deleteRecipes, addRecipe } = require("../services/user.service");

const createUserController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        //  return res.status(400).json({error: errors.array().map(error => error.msg)});
        return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }

    try {
        const user = req.body;
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
        //  return res.status(400).json({error: errors.array().map(error => error.msg)});
        return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }
    const id = req.params.id;
    const user = await getUser(id);

    try {
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
        //  return res.status(400).json({error: errors.array().map(error => error.msg)});
        return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }

    const id = req.params.id;
    const user = await deleteUser(id);
    
    try {
        // also delete recipes associated with the user
        deleteRecipes(id, user.user.recipes);
        
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
        //  return res.status(400).json({error: errors.array().map(error => error.msg)});
        return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }

    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await getUser(id);
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

const deleteRecipesController = async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        //  return res.status(400).json({error: errors.array().map(error => error.msg)});
        return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }
    
    const id = req.params.id;
    const { recipes } = req.body;

    try {
        await deleteRecipes(id, recipes);
        res.status(200).json("deleted successfully");
    } catch (err) {
        res.status(400).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }
        });
    }
}

const addRecipeController = async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        //  return res.status(400).json({error: errors.array().map(error => error.msg)});
        return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }

    const id = req.params.id;
    const recipe = req.body;
    
    try {        
        const newRecipe = await addRecipe(id, recipe);
        res.status(200).json({newRecipe});
    } catch (err) {
        res.status(400).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }
        });
    }
}

module.exports = {
    createUserController,
    getAllUsersController,
    getUserController,
    deleteUserController,
    changePasswordController,
    deleteRecipesController,
    addRecipeController,
}