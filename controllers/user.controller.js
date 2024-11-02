const { createUser, getAllUsers, getUser, updateUser, deleteUser, loginUser, changePassword, updateRecipes } = require("../services/user.service");

const createUserController = async (req, res) => {
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
    try {
        const id = req.params.id;
        const user = await getUser(id);
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

const updateUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const updatedUser = await updateUser(id, user);
        res.status(200).json({updatedUser});
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
    try {
        const id = req.params.id;
        const user = await deleteUser(id);
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

const loginController = async (req, res) => {
    const credentials = req.body;

    try {
        const user = await loginUser(credentials);
        res.status(200).json({user});
    } catch (err) {
        res.status(401).json({ 
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }
        });
    }
};

const changePasswordController = async (req, res) => {
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

const updateRecipesController = async(req, res) => {
    const id = req.params.id;
    const { recipes } = req.body;

    try {
        const result = await updateRecipes(id, recipes);
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
}

module.exports = {
    createUserController,
    getAllUsersController,
    getUserController,
    updateUserController,
    deleteUserController,
    loginController,
    changePasswordController,
    updateRecipesController,
}