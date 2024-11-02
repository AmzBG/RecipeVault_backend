const mongoose = require('mongoose');
const ErrorProMax = require('../errors/error.structure');
const ingredientModel = require('../models/ingredient.model');


const createIngredient = async (ingredientData) => {
    try {
        const ingredient = new ingredientModel(ingredientData);
        await ingredient.save();
        return ingredient;
    } catch (err) {
        throw new ErrorProMax("Error creating ingredient",err.message || '');
    }
}

const getAllIngredients = async () => {
    try {
        const ingredients = await ingredientModel.find().populate('categories');
        return ingredients;
    } catch (err) {
        throw new ErrorProMax("Error getting ingredients", err.message || '');
    }
}

const getIngredient = async (ingredientID) => {
    try {
        if (!mongoose.isValidObjectId(ingredientID)) {
            throw new Error("Invalid ingredient ID format");
        }
        const ingredient = await ingredientModel.findById(ingredientID).populate('categories', 'id name');
        if (!ingredient) {
            throw new Error("Ingredient not found");
        }
        return ingredient;
    } catch (err) {
        throw new ErrorProMax("Error getting ingredient", err.message || '');
    }
}

const updateIngredient = async (ingredientID, ingredientData) => {
    try {
        if (!mongoose.isValidObjectId(ingredientID)) {
            throw new Error("Invalid ingredient ID format");
        }
        const ingredient = await ingredientModel.findByIdAndUpdate(ingredientID, ingredientData, {new: true});
        if (!ingredient) {
            throw new Error("Ingredient not found");
        }
        return ingredient;
    } catch (err) {
        throw new ErrorProMax("Error updating ingredient", err.message || '');
    }
}

const deleteIngredient = async (ingredientID) => {
    try {
        if (!mongoose.isValidObjectId(ingredientID)) {
            throw new Error("Invalid ingredient ID format");
        }
        const ingredient = await ingredientModel.findByIdAndDelete(ingredientID);
        if (!ingredient) {
            throw new Error("Ingredient not found");
        }
        return ingredient;
    } catch (err) {
        throw new ErrorProMax("Error deleting ingredient", err.message || '');
    }
}

module.exports = {
    createIngredient,
    getAllIngredients,
    getIngredient,
    updateIngredient,
    deleteIngredient
}