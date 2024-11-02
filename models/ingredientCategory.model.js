const mongoose = require('mongoose');
const ingredientCategorySchema = require('./IngredientCategories/ingredientCategory.schema');
const applyMiddleware = require('./IngredientCategories/ingredientCategory.middleware');

// pass throw middleware first
applyMiddleware(ingredientCategorySchema);


const ingredientCategoryModel = mongoose.model('ingredientcategories', ingredientCategorySchema);

module.exports = ingredientCategoryModel;