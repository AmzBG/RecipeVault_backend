const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a username"],
            unique: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters long"],
            maxlength: [100, "Username must be at most 100 characters long"]
        },
        email: {
            type: String,
            required: [true, "Please enter an email address"],
            unique: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address",
            ]
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            trim: true,
            minlength: [6, "Username must be at least 6 characters long"],
            maxlength: [180, "Username must be at most 180 characters long"]
        },
        recipes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'recipes',
            validate: {
                validator: function(value) {
                    // Check for duplicate values in the recipes array
                    return Array.isArray(value) && new Set(value.map(String)).size === value.length;
                },
                message: "Duplicate recipes are not allowed."
            }
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: false,
            transform: function (doc, ret) {
                delete ret.password;
                return ret;
            }
        }
    }
);

module.exports = userSchema;