const IngredientModel = require("./models/ingredient.model");
const { getAllIngredients, createIngredient, updateIngredient } = require("./services/ingredient.service");
const { getAllIngredientCategories, createIngredientCategory, deleteIngredientCategory } = require("./services/ingredientCategory.service");
const imp = require('C:\\Users\\Amz\\Desktop\\Notes\\ingredients_categorized.js');  // Importing your ingredients data

// Function to get all categories from the database
const getAllCategories = async () => {
    const res = await getAllIngredientCategories();
    console.log("categories", res);
    return res;
}

// Function to add a single category
const addCategory = async (category) => {
    const res = await createIngredientCategory(category);
    console.log("created", res);
}

// Function to add all categories from the imported data
const addAllCategories = async () => {
    const ingredients = imp.ingredients;  // Access the ingredients from the imported file
    const names = ingredients.map((obj) => obj.name);
    console.log("category names", names);
    
    // Loop over category names and add them to the database
    for (const name of names) {
        await addCategory({ name });
    }
}

// Function to get all ingredients from the database
const getAllIng = async () => {
    const res = await getAllIngredients();
    console.log("ingredients", res);
}

// Function to add a single ingredient
const addIngredient = async (ingredient) => {
    console.log("Adding ingredient", ingredient);
    const res = await createIngredient(ingredient);
    console.log("Created ingredient", res);
}

// Main function to loop through categories and ingredients, and add or update them
const main = async () => {
    const categories = await getAllCategories(); // Fetch existing categories
    const mp = new Map();  // Map to associate category name with ID
    
    // Map categories to IDs
    categories.forEach(cat => {
        mp.set(cat.name, cat._id);
    });
    
    console.log("Category map:");
    mp.forEach((val, key) => {
        console.log(key + ": " + val);
    });
    
    const ingredients = imp.ingredients; // Access ingredients from the imported file
    
    // Loop through each ingredient category and its ingredients
    for (const obj of ingredients) {
        // Ensure each ingredient is processed correctly
        for (const ing of obj.ingredients) {
            if (!ing) return;  // Skip if ingredient is empty

            const isThere = await exists(ing);  // Check if ingredient exists
            console.log("Already exists", isThere);
            
            if (isThere) {
                const res = await updateIng(isThere, obj, mp);  // If ingredient exists, update it
                console.log("Updated ingredient", res);
            } else {
                const res = await addIngredient({
                    name: ing,
                    categories: [mp.get(obj.name).toString()]  // Link ingredient to the correct category
                });
                console.log("Created ingredient", res);
            }
        }
    }
}

// Function to check if an ingredient already exists in the database
const exists = async (ing) => {
    const res = await IngredientModel.findOne({ name: ing });
    return res;
}

// Function to update an ingredient in the database
const updateIng = async (isThere, obj, mp) => {
    console.log("Updating ingredient", isThere, obj);
    
    const res = await updateIngredient(isThere._id, {
        name: isThere.name,
        categories: [...isThere.categories, mp.get(obj.name).toString()]  // Add category to ingredient
    });
    return res;
}

// Run the main function to start the process
main();
