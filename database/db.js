const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGOURL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGOURL);
        console.log("Database connected!!");
    } catch (e) {
        console.log("Error connecting to the database:", e);
        process.exit(1);
    }
};

module.exports = connectDB;
