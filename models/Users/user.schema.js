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