# Recipe Management Backend

## Overview

This project is a backend system for a **Recipe Management Application**. It provides APIs for managing users, recipes, ingredients, and ingredient categories. The backend is built using **Node.js** and **Express.js**, with **MongoDB** as the database. It includes features such as user authentication, recipe creation, ingredient management, and more.

## Features

- **User Management**: Register, login, and manage user accounts.
- **Recipe Management**: Create, update, delete, and retrieve recipes.
- **Ingredient Management**: Manage ingredients and their categories.
- **Authentication**: Secure user authentication using JWT.
- **Validation**: Input validation using `express-validator`.
- **Error Handling**: Custom error handling with detailed error messages.
- **Middleware**: Middleware for authentication and data validation.

## Project Structure

The project is organized into the following directories:

- **controllers/**: Contains the logic for handling API requests.
- **models/**: Defines the MongoDB schemas and models for the application.
- **services/**: Contains the business logic for interacting with the database.
- **routes/**: Defines the API endpoints and their respective controllers.
- **middleware/**: Includes middleware for authentication and validation.
- **validation/**: Contains validation logic for user inputs.
- **errors/**: Custom error classes for consistent error handling.
- **database/**: Handles the connection to the MongoDB database.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM library for MongoDB.
- **JWT**: For secure user authentication.
- **bcrypt**: For password hashing.
- **dotenv**: For managing environment variables.

## API Endpoints

### Authentication
- `POST /api/login`: Login a user.
- `POST /api/register`: Register a new user.
- `POST /api/logout`: Logout a user.

### Users
- `GET /api/users/getAll`: Retrieve all users.
- `GET /api/users/get`: Retrieve the logged-in user's details.
- `POST /api/users/cp`: Change the user's password.
- `POST /api/users/add/recipe`: Add a recipe to the user's collection.
- `DELETE /api/users/delete`: Delete the logged-in user's account.
- `DELETE /api/users/delete/recipes`: Delete specific recipes from the user's collection.

### Recipes
- `POST /api/recipes/create`: Create a new recipe.
- `GET /api/recipes/getAll`: Retrieve all recipes.
- `GET /api/recipes/get/:id`: Retrieve a specific recipe by ID.
- `PUT /api/recipes/update/:id`: Update a recipe by ID.
- `DELETE /api/recipes/delete/:id`: Delete a recipe by ID.

### Ingredients
- `POST /api/ingredients/create`: Create a new ingredient.
- `GET /api/ingredients/getAll`: Retrieve all ingredients.
- `GET /api/ingredients/get/:id`: Retrieve a specific ingredient by ID.
- `PUT /api/ingredients/update/:id`: Update an ingredient by ID.
- `DELETE /api/ingredients/delete/:id`: Delete an ingredient by ID.

### Ingredient Categories
- `POST /api/ingredientCategories/create`: Create a new ingredient category.
- `GET /api/ingredientCategories/getAll`: Retrieve all ingredient categories.
- `GET /api/ingredientCategories/get/:id`: Retrieve a specific ingredient category by ID.
- `PUT /api/ingredientCategories/update/:id`: Update an ingredient category by ID.
- `DELETE /api/ingredientCategories/delete/:id`: Delete an ingredient category by ID.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/AmzBG/RecipeVault_backend.git
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=7000
   MONGO_URL=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   saltRounds=10
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will run on `http://localhost:7000`.

## Error Handling

The application uses a custom error class `ErrorProMax` to handle errors consistently. Errors include detailed messages and additional information for debugging.

## Security Features

- **JWT Authentication**: Ensures secure access to protected routes.
- **Password Hashing**: User passwords are hashed using `bcrypt`.
- **Validation**: Input validation prevents invalid or malicious data.