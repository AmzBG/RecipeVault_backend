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

const getAllRecipes = async () => {
    try {
        const recipes = await recipeModel.find();
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

const getRecipe = async (recipeID) => {
    try {
        if (!mongoose.isValidObjectId(recipeID)) {
            throw new Error("Invalid recipe ID format");
        }
        const recipe = await recipeModel.findById(recipeID);
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
        const recipe = await recipeModel.findByIdAndUpdate(recipeID, recipeData, {new: true});
        if (!recipe) {
            throw new Error("Recipe not found");
        }
        return recipe;
    } catch (err) {
        throw new ErrorProMax("Error updating recipe", err.message || '');
    }
}

const deleteRecipe = async (recipeID) => {
    try {
        
        if (!mongoose.isValidObjectId(recipeID)) {
            throw new Error("Invalid recipe ID format");
        }
        console.log("recieved:", recipeID);
        const recipe = await recipeModel.findByIdAndDelete(recipeID);
        console.log("recipe:", recipe);
        
        if (!recipe) {
            throw new Error("Recipe not found");
        }
        return recipe;
    } catch (err) {
        throw new ErrorProMax("Error deleting recipe", err.message || '');
    }
}

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe
}