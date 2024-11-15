const { getIngredientIDs } = require("../services/ingredient.service");
const { createRecipe, getAllRecipes, getRecipe, updateRecipe, deleteRecipe, getPagedRecipes, getRecipeByName } = require("../services/recipe.service");

const createRecipeController = async (req, res) => {
    try {
        // get userID from token
        const userID = req.user.id;
        const recipe = { ...req.body, userID };
        const ingredientsIDs = await getIngredientIDs(recipe.ingredients);
        recipe.ingredients = ingredientsIDs;
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
        const userID = req.user.id;
        const recipes = await getAllRecipes(userID);
        res.status(200).json({recipes});    
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
        }
    }
    
const getPagedRecipesController = async (req, res) => {
    const userID = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    try {
        const result = await getPagedRecipes(userID, page, limit);
        res.status(200).json(result);
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
        const userID = req.user.id;
        const recipe = await getRecipe(id, userID);
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
        const userID = req.user.id;
        const recipe = { ...req.body, userID };
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
        const userID = req.user.id;
        const recipe = await deleteRecipe(id, userID);
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

const getRecipeByNameController = async (req, res) => {
    try {
        const name = req.params.name;
        const userID = req.user.id;
        const recipes = await getRecipeByName(name, userID);
        res.status(200).json({recipes});
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
    getPagedRecipesController,
    getRecipeController,
    updateRecipeController,
    deleteRecipeController,
    getRecipeByNameController,
}