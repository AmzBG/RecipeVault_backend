const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Recipe must have a name"],
            trim: true,
            unique: true,
            minlength: [3, "Recipe name must be at least 3 characters long"],
            maxlength: [180, "Recipe name must not exceed 180 characters long"]
        },
        ingredients: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'ingredients',
            required: [true, "Recipe must have ingredients"],
            validate: {
                validator: function(value) {
                    // Check for duplicate values in the ingredients array
                    return Array.isArray(value) && new Set(value.map(String)).size === value.length;
                },
                message: "Duplicate ingredients are not allowed."
            }
        },
        prepLevel: {
            type: String,
            required: [true, "Recipe must have a preparation level"],
            enum: {
                values: ["easy", "medium", "hard"],
                message: "Preparation level must be either 'easy', 'medium', or 'hard'"
            }
        },
        servings: {
            type: Number,
            default: 1,
            min: [1, "There must be at least one serving"],
            max: [100, "Number of servings must not exceed 100"]
        },
        categories: {
            type: [String],
            required: [true, "Recipe must belong to a collection"],
            enum: {
                values: ["Breakfast", "Lunch", "Snack", "Dinner", "Dessert"],
                message: "Category must be one of: Breakfast, Lunch, Snack, Dinner, Dessert"
            }
        },
        tags: {
            type: [String],
            required: [true, "Recipe must belong to a category"],
            enum: {
                values: ["Beef", "Bread", "Soup", "Sandwich", "Vegetarian", "Fish", "Chicken"],
                message: "Tag must be one of: Beef, Bread, Soup, Sandwich, Vegetarian, Fish, Chicken"
            }
        },
        totalPrepTime: {
            type: Number,
            required: [true, "Total preparation time is required"],
            min: [1, "Preparation time must be at least 1 minute"],
            max: [1440, "Preparation time must not exceed 24 hours"]
        },
        inactiveTime: {
            type: Number,
            default: 0,
            min: [0, "Inactive time cannot be negative"],
            max: [525600, "Inactive time must not exceed a year"]
        },
        directions: {
            type: [String],
            required: [true, "Directions are required"]
        },
        pictureURL: {
            type: String,
            trim: true,
            validate: {
                validator: function(v) {
                    return /^https?:\/\/.+/.test(v);
                },
                message: "Must be a valid URL"
            }
        },
        videoURL: {
            type: String,
            trim: true,
            validate: {
                validator: function(v) {
                    return /^https?:\/\/.+/.test(v);
                },
                message: "Must be a valid URL"
            }
        },
        source: {
            type: String,
            trim: true
        },
        comments: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = recipeSchema;