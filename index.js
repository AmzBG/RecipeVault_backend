const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./database/db');

// import routes
const userRoute = require('./routes/user.route');
const ingredientCategoryRoute = require('./routes/ingredientCategory.route');
const ingredientRoute = require('./routes/ingredient.route');
const recipeRoute = require('./routes/recipe.route');

const app = express();

app.use(express.json()); // this now is a replacement of body-parser as express added this in higher versions

dotenv.config();

const PORT = process.env.PORT || 7000;

// connect the database
connectDB();

app.use('/api/users', userRoute);
app.use('/api/ingredientCategories', ingredientCategoryRoute);
app.use('/api/ingredients', ingredientRoute);
app.use('/api/recipes', recipeRoute);

app.get('/', async (req, res) => {
    res.json("server running...");
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})