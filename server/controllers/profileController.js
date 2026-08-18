const User = require("../models/user");

// GET PROFILE
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
    try {
        const {
            name,
            age,
            gender,
            height,
            weight,
            goal,
            dailyCalorieGoal,
            proteinGoal,
            weeklyWorkoutGoal,
            weeklyWorkoutTimeGoal
        } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user,
            {
                name,
                age,
                gender,
                height,
                weight,
                goal,
                dailyCalorieGoal,
                proteinGoal,
                weeklyWorkoutGoal,
                weeklyWorkoutTimeGoal
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};