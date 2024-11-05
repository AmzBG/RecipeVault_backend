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
    try {
        if (Array.isArray(recipeIDs) || recipeIDs.length !== 0) {
            // delete every recipe in the array
            for (const recipeID of recipeIDs) {
                await deleteRecipe(recipeID);
            }
        }
    } catch (err) {
        throw new ErrorProMax('Error deleting recipes', err.message || '');
    }
};

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
        throw new ErrorProMax('Error finding user', err.message || '');
    }
};


module.exports = {
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    changePassword,
    deleteRecipes,
    findByUsernameOrEmail,
}