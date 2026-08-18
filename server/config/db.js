const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        console.log("Checking MONGO_URI...");

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing from .env file");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error.message);
    }
};

module.exports = connectDB;