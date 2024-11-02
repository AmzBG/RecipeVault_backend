function applyMiddleware(schema) {

  // unique names
  schema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      next(new Error('A category with that name already exists. Please use a different name.'));
    } else {
      next(error);
    }
  });
}

module.exports = applyMiddleware;

