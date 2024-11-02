const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter ingredient name"],
            trim: true,
            minlength: [2, "Ingredient name must be at least 2 characters long"],
            maxlength: [50, "Ingredient name must be less than 50 characters"],
            unique: true
        },
        categories: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'ingredientcategories',
            required: [true, "Ingredient must belong to a category"],
            validate: {
                validator: function(value) {
                    // Check for duplicate values in the categories array
                    return Array.isArray(value) && new Set(value.map(String)).size === value.length;
                },
                message: "Duplicate categories are not allowed."
            }
        }
    },
    {
      timestamps: true,
    }
);

module.exports = ingredientSchema;