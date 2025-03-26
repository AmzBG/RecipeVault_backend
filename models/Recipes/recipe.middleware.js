const { mongoose } = require("mongoose");

function applyMiddleware(schema) {

 // Pre-save middleware to check unique name per user
  schema.pre('save', async function (next) {
    try {
        const existingRecipe = await mongoose.models.recipes.findOne({
            name: this.name,
            userID: this.userID
        });

        if (existingRecipe && existingRecipe._id.toString() !== this._id.toString()) {
            return next(new Error('A recipe with this name already exists for this user.'));
        }
        next();
    } catch (err) {
        next(err);
    }
  });

  // prevent duplicate entries
  schema.pre('save', async function(next) {
    try {
      const ingredientIds = this.ingredients;
      const uniqueIds = [...new Set(ingredientIds)];
    
      if (ingredientIds.length !== uniqueIds.length) {
        const error = new Error('Duplicate ingredients found');
        error.statusCode = 400;
        return next(error);
      }
    
      next();
    } catch (err) {
      next(err);
    }
  });
}

module.exports = applyMiddleware;

