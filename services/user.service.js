const mongoose = require('mongoose');
const ErrorProMax = require('../errors/error.structure');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { deleteRecipe, createRecipe } = require('./recipe.service');

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
        const users = await userModel.find();
        // const users = await userModel.find().populate('recipes', '_id ingredients');
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
        const user = await userModel.findById(userID);
        // const user = await userModel.findById(userID).populate('recipes', '_id ingredients');
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (err) {
        throw new ErrorProMax("Error getting user", err.message || '');
    }
    // throw new ErrorProMax("Error getting user", "feature disabled");
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
        
        return user;
    } catch (err) {
        throw new ErrorProMax("Error deleting user", err.message || '');
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

const deleteRecipes = async (id, recipeIDs) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid user ID format");
    }

    if (!Array.isArray(recipeIDs)) {
        throw new Error("Recipes must be an array of IDs");
    }

    try {
        if (!Array.isArray(recipeIDs) || recipeIDs.length === 0) {
            throw new Error("recipes must be a non-empty array.");
        }
        
        // delete every recipe in the array
        for (const recipeID of recipeIDs) {
            await deleteRecipe(recipeID);
        }

        // update user recipes array
        await userModel.updateOne(
            { _id: id },
            { $pull: { recipes: { $in: recipeIDs } } }
        );
    } catch (err) {
        throw new ErrorProMax('Error deleting recipes', err.message || '');
    }
}

const addRecipe = async (id, recipe) => {
    try {
        const newRecipe = await createRecipe(recipe);

        // add recipeID to the user's recipes array
        await userModel.updateOne(
            { _id: id },
            { $addToSet: { recipes: newRecipe._id } }
        );
        
        return newRecipe;
    } catch (err) {
        throw new ErrorProMax('Error adding recipe', err.message || '');
    }
}

const findByUsernameOrEmail = async (usernameOrEmail) => {
    try {
        const user = await userModel.findOne({
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (err) {
        throw new ErrorProMax('Error adding recipe', err.message || '');
    }
}


module.exports = {
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    changePassword,
    deleteRecipes,
    addRecipe,
    findByUsernameOrEmail,
}