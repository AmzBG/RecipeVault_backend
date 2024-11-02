const mongoose = require('mongoose');

const ingredientCategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a category name"],
            unique: true,
            trim: true,
            minlength: [3, "Category name must be at least 3 characters long"],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = ingredientCategorySchema;