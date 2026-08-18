const Workout = require("../models/workout");

// ========================================
// ADD WORKOUT
// ========================================
exports.addWorkout = async (req, res) => {
    try {
        const {
            exercise,
            category,
            duration,
            caloriesBurned,
            date,
            notes
        } = req.body;

        if (!exercise || !duration) {
            return res.status(400).json({
                success: false,
                message: "Exercise and duration are required"
            });
        }

        const workout = await Workout.create({
            user: req.user,
            exercise,
            category,
            duration,
            caloriesBurned,
            date,
            notes
        });

        res.status(201).json({
            success: true,
            message: "Workout added successfully",
            workout
        });

    } catch (error) {
        console.error("Add workout error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ========================================
// GET MY WORKOUTS
// ========================================
exports.getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({
            user: req.user
        }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: workouts.length,
            workouts
        });

    } catch (error) {
        console.error("Get workouts error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ========================================
// GET SINGLE WORKOUT
// ========================================
exports.getWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOne({
            _id: req.params.id,
            user: req.user
        });

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found"
            });
        }

        res.status(200).json({
            success: true,
            workout
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ========================================
// UPDATE WORKOUT
// ========================================
exports.updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Workout updated successfully",
            workout
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ========================================
// DELETE WORKOUT
// ========================================
exports.deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOneAndDelete({
            _id: req.params.id,
            user: req.user
        });

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Workout deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};