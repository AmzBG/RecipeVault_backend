const { createIngredientCategory, getAllIngredientCategories, getIngredientCategory, updateIngredientCategory, deleteIngredientCategory } = require("../services/ingredientCategory.service");

const createIngredientCategoryController = async (req, res) => {
    try {
        const category = req.body;
        const newCategory = await createIngredientCategory(category);
        res.status(200).json({newCategory});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

const getAllIngredientCategoriesController = async (req, res) => {
    try {
        const categories = await getAllIngredientCategories();
        res.status(200).json({categories});    
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

const getIngredientCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await getIngredientCategory(id);
        res.status(200).json({category});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

const updateIngredientCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const cateogry = req.body;
        const updatedCategory = await updateIngredientCategory(id, cateogry);
        res.status(200).json({updatedCategory});
    } catch (err) {
        res.status(500).json({
            message: "Intenal error occured",
            details: {
                error: err.message,
                info: err.details
            }});
    }
}

const deleteIngredientCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await deleteIngredientCategory(id);
        res.status(200).json({category});
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
    createIngredientCategoryController,
    getAllIngredientCategoriesController,
    getIngredientCategoryController,
    updateIngredientCategoryController,
    deleteIngredientCategoryController,
}