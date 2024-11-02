const { createRecipe, getAllRecipes, getRecipe, updateRecipe, deleteRecipe } = require("../services/recipe.service");

const createRecipeController = async (req, res) => {
    try {
        const recipe = req.body;
        const newRecipe = await createRecipe(recipe);
        res.status(200).json({newRecipe});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

const getAllRecipesController = async (req, res) => {
    try {
        const recipies = await getAllRecipes();
        res.status(200).json({recipies});    
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

const getRecipeController = async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = await getRecipe(id);
        res.status(200).json({recipe});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

const updateRecipeController = async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = req.body;
        const updatedRecipe = await updateRecipe(id, recipe);
        res.status(200).json({updatedRecipe});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

const deleteRecipeController = async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = await deleteRecipe(id);
        res.status(200).json({recipe});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

module.exports = {
    createRecipeController,
    getAllRecipesController,
    getRecipeController,
    updateRecipeController,
    deleteRecipeController,
}