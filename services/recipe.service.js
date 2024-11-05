const mongoose = require('mongoose');
const ErrorProMax = require('../errors/error.structure');
const recipeModel = require('../models/recipe.model');


const createRecipe = async (recipeData) => {
    try {
        const recipe = new recipeModel(recipeData);
        await recipe.save();
        return recipe;
    } catch (err) {
        throw new ErrorProMax("Error creating recipe",err.message || '');
    }
}

const getAllRecipes = async (userID) => {
    try {
        const recipes = await recipeModel.find({ userID });
        // const recipes = await recipeModel.find().populate({
        //     path: 'ingredients',
        //     // populate: {
        //     //     path: 'categories',
        //     //     select: "_id name"
        //     // },
        //     select: "_id name categories"
        // }).lean();
        return recipes;
    } catch (err) {
        throw new ErrorProMax("Error getting recipes", err.message || '');
    }
    // throw new ErrorProMax("Error getting recipes", "feature disabled");
}

const getRecipe = async (recipeID, userID) => {
    try {
        if (!mongoose.isValidObjectId(recipeID)) {
            throw new Error("Invalid recipe ID format");
        }
        const recipe = await recipeModel.findOne({ _id: recipeID, userID });
        // const recipe = await recipeModel.findById(recipeID).populate('ingredients', 'id name');
        if (!recipe) {
            throw new Error("Recipe not found");
        }
        return recipe;
    } catch (err) {
        throw new ErrorProMax("Error getting recipe", err.message || '');
    }
}

const updateRecipe = async (recipeID, recipeData) => {
    try {
        if (!mongoose.isValidObjectId(recipeID)) {
            throw new Error("Invalid recipe ID format");
        }
        const recipe = await recipeModel.findOneAndUpdate(
            { _id: recipeID, userID: recipeData.userID },
            recipeData,
            {new: true}
        );

        if (!recipe) {
            throw new Error("Recipe not found");
        }
        return recipe;
    } catch (err) {
        throw new ErrorProMax("Error updating recipe", err.message || '');
    }
}

const deleteRecipe = async (recipeID, userID) => {
    try {
        
        if (!mongoose.isValidObjectId(recipeID)) {
            throw new Error("Invalid recipe ID format");
        }
        const recipe = await recipeModel.findOneAndDelete({ _id: recipeID, userID });
        
        if (!recipe) {
            throw new Error("Recipe not found");
        }
        return recipe;
    } catch (err) {
        throw new ErrorProMax("Error deleting recipe", err.message || '');
    }
}

const deleteAllRecipes = async (userID) => {
    try {
        const recipes = await recipeModel.deleteMany({ userID });
        return recipes;
    } catch (err) {
        throw new ErrorProMax("Error deleting recipe", err.message || '');
    }
}

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe,
    deleteAllRecipes,
}