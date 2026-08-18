const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    age: Number,

    gender: String,

    height: Number,

    weight: Number,

    goal: {
        type: String,
        enum: ["Weight Loss", "Muscle Gain", "Maintain Fitness"],
        default: "Maintain Fitness"
    },

    dailyCalorieGoal: {
    type: Number,
    default: 2000
},

proteinGoal: {
    type: Number,
    default: 100
},

weeklyWorkoutGoal: {
    type: Number,
    default: 4
},

weeklyWorkoutTimeGoal: {
    type: Number,
    default: 180
}
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);