function applyMiddleware(schema) {
  
  // unique names
  schema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      next(new Error('An ingredient with that name already exists. Please use a different name.'));
    } else {
      next(error);
    }
  });

  // prevent duplicate entries
  schema.pre('save', async function(next) {
    const categoryIDs = this.categories;
    const uniqueIds = [...new Set(categoryIDs)];
  
    if (categoryIDs.length !== uniqueIds.length) {
      const error = new Error('Duplicate categories found');
      error.statusCode = 400;
      return next(error);
    }
  
    next();
  });
}

module.exports = applyMiddleware;

