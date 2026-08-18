const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        mealType: {
            type: String,
            enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
            required: true
        },

        foodName: {
            type: String,
            required: true,
            trim: true
        },

        calories: {
            type: Number,
            required: true
        },

        protein: {
            type: Number,
            default: 0
        },

        carbs: {
            type: Number,
            default: 0
        },

        fats: {
            type: Number,
            default: 0
        },

        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Diet", dietSchema);