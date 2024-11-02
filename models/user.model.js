const mongoose = require('mongoose');
const userSchema = require('./Users/user.schema')
const applyMiddleware = require('./Users/user.middleware');

// pass throw middleware first
applyMiddleware(userSchema);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;