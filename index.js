const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// jwt authentication middleware
const authenticateToken = require('./middleware/authentication');

// import routes
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const ingredientCategoryRoute = require('./routes/ingredientCategory.route');
const ingredientRoute = require('./routes/ingredient.route');
const recipeRoute = require('./routes/recipe.route');

const app = express();

app.use(express.json()); // this now is a replacement of body-parser as express added this in higher versions
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Allow credentials (cookies) to be sent
}));

dotenv.config();

const PORT = process.env.PORT || 7000;

// connect the database
connectDB();

// login
app.use('/api', authRoute);

// apply authentication middleware to all routes
// app.use(authenticateToken);
//! Enable when frontend authentication is done
app.use((req, res, next) => {
    if (!req.user) {
        req.user = {id: "672bbf21fb4925ba371bd001"};
    }
    next();
});

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