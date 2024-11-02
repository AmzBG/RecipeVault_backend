const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

function applyMiddleware(schema) {
  
  // unique username
  schema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      if (duplicateField === 'username') {
          next(new Error('Username already taken. Please choose another one.'));
      } else if (duplicateField === 'email') {
          next(new Error('Email address already registered. Please use a different email.'));
      } else {
          next(new Error('Duplicate field error.'));
      }
    } else {
      next(error);
    }
  });

  // hash password
  schema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }

    try {
      const salt = await bcrypt.genSalt(Number(process.env.saltRounds));
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  });
}

module.exports = applyMiddleware;

