const mongoose = require('mongoose');
const recipeSchema = require('./Recipes/recipe.schema');
const applyMiddleware = require('./Recipes/recipe.middleware');

// pass throw middleware first
applyMiddleware(recipeSchema);

const RecipeModel = mongoose.model('recipes', recipeSchema);

module.exports = RecipeModel;