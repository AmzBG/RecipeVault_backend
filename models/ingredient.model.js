const mongoose = require('mongoose');
const ingredientSchema = require('./Ingredients/ingredient.schema');
const applyMiddleware = require('./Ingredients/ingredient.middleware');

// pass throw middleware first
applyMiddleware(ingredientSchema);

const IngredientModel = mongoose.model('ingredients', ingredientSchema);

module.exports = IngredientModel;