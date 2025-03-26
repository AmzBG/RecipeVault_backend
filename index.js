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

// login
app.use('/api', authRoute);

// apply authentication middleware to all routes
app.use(authenticateToken);

app.use('/api/users', userRoute);
app.use('/api/ingredientCategories', ingredientCategoryRoute);
app.use('/api/ingredients', ingredientRoute);
app.use('/api/recipes', recipeRoute);

app.get('/', async (req, res) => {
    res.json("server running...");
})

// connect the database and then start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server running on port " + PORT);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err);
        process.exit(1); // Exit the process with failure
    });