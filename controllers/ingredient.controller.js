const { createIngredient, getAllIngredients, getIngredient, updateIngredient, deleteIngredient, getAllIngredientNames, getIngredientIDs } = require("../services/ingredient.service");

const createIngredientController = async (req, res) => {
    try {
        const ingredient = req.body;
        const newIngredient = await createIngredient(ingredient);
        res.status(200).json({newIngredient});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

const getAllIngredientsController = async (req, res) => {
    try {
        const ingredients = await getAllIngredients();
        res.status(200).json({ingredients});    
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

const getIngredientController = async (req, res) => {
    try {
        const id = req.params.id;
        const ingredient = await getIngredient(id);
        res.status(200).json({ingredient});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

const updateIngredientController = async (req, res) => {
    try {
        const id = req.params.id;
        const ingredient = req.body;
        const updatedIngredient = await updateIngredient(id, ingredient);
        res.status(200).json({updatedIngredient});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

const deleteIngredientController = async (req, res) => {
    try {
        const id = req.params.id;
        const ingredient = await deleteIngredient(id);
        res.status(200).json({ingredient});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

const getAllIngredientNamesController = async (req, res) => {
    try {
        const ingredients = await getAllIngredientNames();
        res.status(200).json({ingredients});    
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
    createIngredientController,
    getAllIngredientsController,
    getIngredientController,
    updateIngredientController,
    deleteIngredientController,
    getAllIngredientNamesController,
}