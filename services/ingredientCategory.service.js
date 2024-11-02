const mongoose = require('mongoose');
const ErrorProMax = require('../errors/error.structure');
const ingredientCategoryModel = require('../models/ingredientCategory.model');


const createIngredientCategory = async (ingredientCategoryData) => {
    try {
        const ingredientCategory = new ingredientCategoryModel(ingredientCategoryData);
        await ingredientCategory.save();
        return ingredientCategory;
    } catch (err) {
        throw new ErrorProMax("Error creating ingredient category",err.message || '');
    }
}

const getAllIngredientCategories = async () => {
    try {
        const ingredientCategories = await ingredientCategoryModel.find();
        return ingredientCategories;
    } catch (err) {
        throw new ErrorProMax("Error getting ingredient categories", err.message || '');
    }
}

const getIngredientCategory = async (ingredientCategoryID) => {
    try {
        if (!mongoose.isValidObjectId(ingredientCategoryID)) {
            throw new Error("Invalid ingredient category ID format");
        }
        const ingredientCategory = await ingredientCategoryModel.findById(ingredientCategoryID);
        if (!ingredientCategory) {
            throw new Error("Ingredient category not found");
        }
        return ingredientCategory;
    } catch (err) {
        throw new ErrorProMax("Error getting ingredient category", err.message || '');
    }
}

const updateIngredientCategory = async (ingredientCategoryID, ingredientCategoryData) => {
    try {
        if (!mongoose.isValidObjectId(ingredientCategoryID)) {
            throw new Error("Invalid ingredient category ID format");
        }
        const ingredientCategory = await ingredientCategoryModel.findByIdAndUpdate(ingredientCategoryID, ingredientCategoryData, {new: true});
        if (!ingredientCategory) {
            throw new Error("Ingredient category not found");
        }
        return ingredientCategory;
    } catch (err) {
        throw new ErrorProMax("Error updating category", err.message || '');
    }
}

const deleteIngredientCategory = async (ingredientCategoryID) => {
    try {
        if (!mongoose.isValidObjectId(ingredientCategoryID)) {
            throw new Error("Invalid ingredientCategory ID format");
        }
        const ingredientCategory = await ingredientCategoryModel.findByIdAndDelete(ingredientCategoryID);
        if (!ingredientCategory) {
            throw new Error("ingredientCategory not found");
        }
        return ingredientCategory;
    } catch (err) {
        throw new ErrorProMax("Error deleting ingredientCategory", err.message || '');
    }
}

module.exports = {
    createIngredientCategory,
    getAllIngredientCategories,
    getIngredientCategory,
    updateIngredientCategory,
    deleteIngredientCategory
}