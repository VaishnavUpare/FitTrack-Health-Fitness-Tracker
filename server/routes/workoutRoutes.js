const express = require("express");

const router = express.Router();

const {
    addWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
} = require("../controllers/workoutController");

const authMiddleware = require("../middleware/authMiddleware");


// Add workout
router.post("/", authMiddleware, addWorkout);

// Get all my workouts
router.get("/", authMiddleware, getWorkouts);

// Get one workout
router.get("/:id", authMiddleware, getWorkout);

// Update workout
router.put("/:id", authMiddleware, updateWorkout);

// Delete workout
router.delete("/:id", authMiddleware, deleteWorkout);

//Update workout
router.put("/:id", authMiddleware, updateWorkout);


module.exports = router;