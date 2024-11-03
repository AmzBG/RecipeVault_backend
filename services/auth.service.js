const bcrypt = require('bcrypt');
const ErrorProMax = require('../errors/error.structure');
const { findByUsernameOrEmail } = require('./user.service');

const loginUser = async ({ usernameOrEmail, password }) => {
    try {
        const user = await findByUsernameOrEmail(usernameOrEmail);
        
        if (!user) {
            throw new Error('User not found');
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            throw new Error('Incorrect password');
        }

        return user;
    } catch (err) {
        throw new ErrorProMax('Error during login', err.message || ''); 
    }
};

module.exports = {
    loginUser,
}