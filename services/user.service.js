const mongoose = require('mongoose');
const ErrorProMax = require('../errors/error.structure');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const createUser = async (userData) => {
    try {
        const user = new userModel(userData);
        await user.save();
        // exclude the password from the returned user object
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    } catch (err) {
        throw new ErrorProMax("Error creating user",err.message || '');
    }
};

const getAllUsers = async () => {
    try {
        const users = await userModel.find().populate('recipes', '_id ingredients')
        return users;
    } catch (err) {
        throw new ErrorProMax("Error getting users", err.message || '');
    }
    // throw new ErrorProMax("Error getting users", "feature disabled");
};

const getUser = async (userID) => {
    try {
        if (!mongoose.isValidObjectId(userID)) {
            throw new Error("Invalid user ID format");
        }
        const user = await userModel.findById(userID).populate('recipes', '_id ingredients');
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (err) {
        throw new ErrorProMax("Error getting user", err.message || '');
    }
    // throw new ErrorProMax("Error getting user", "feature disabled");
};

const updateUser = async (userID, userData) => {
    // try {
    //     if (!mongoose.isValidObjectId(userID)) {
    //         throw new Error("Invalid user ID format");
    //     }
    //     const user = await userModel.findByIdAndUpdate(userID, userData, {new: true});
    //     if (!user) {
    //         throw new Error("User not found");
    //     }
    //     return user;
    // } catch (err) {
    //     throw new ErrorProMax("Error updating user", err.message || '');
    // }
    throw new ErrorProMax("Error updating user", "feature disabled");
};

const deleteUser = async (userID) => {
    try {
        if (!mongoose.isValidObjectId(userID)) {
            throw new Error("Invalid user ID format");
        }
        
        const user = await userModel.findByIdAndDelete(userID);
        if (!user) {
            throw new Error("User not found");
        }

        // Delete all recipes associated with the user
        await recipeModel.deleteMany({ userID });
        
        return user;
    } catch (err) {
        throw new ErrorProMax("Error deleting user", err.message || '');
    }
};

const loginUser = async ({ usernameOrEmail, password }) => {
    try {
        const user = await userModel.findOne({
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
        });
        
        if (!user) {
            throw new Error('User not found');
        }
        console.log("login, password:", password);
        console.log("login, user.password:", user.password);
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            throw new Error('Incorrect password');
        }

        return user;
    } catch (err) {
        throw new ErrorProMax('Error during login', err.message || ''); 
    }
};

const changePassword = async ({ user, oldPassword, newPassword }) => {
    try {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        
        if (!isMatch) {
            throw new Error('Old password is incorrect');
        }
        user.password = newPassword;
        await user.save();
        return user;
    } catch (err) {
        throw new ErrorProMax('Error changing password', err.message || '');
    }
};

const updateRecipes = async ({userID, recipes}) => {
    try {

        if (!mongoose.isValidObjectId(id)) {
            throw new Error("Invalid user ID format");
        }
    
        if (!Array.isArray(recipes)) {
            throw new Error("Recipes must be an array of IDs");
        }

        const result = await userModel.updateOne(
            { _id: userID },
            { $addToSet: { recipes: { $each: recipes } } },
            { runValidators: true }
        );

        if (result.nModified === 0) {
            throw new Error("No changes made");
        }

        return result;
    } catch (err) {
        throw new ErrorProMax('Error changing password', err.message || '');
    }
}


module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
    changePassword,
    updateRecipes,
}