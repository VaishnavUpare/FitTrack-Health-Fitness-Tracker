const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        exercise: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            enum: [
                "Cardio",
                "Strength",
                "Flexibility",
                "Sports",
                "Other"
            ],
            default: "Other"
        },

        duration: {
            type: Number,
            required: true
        },

        caloriesBurned: {
            type: Number,
            default: 0
        },

        date: {
            type: Date,
            default: Date.now
        },

        notes: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Workout", workoutSchema);