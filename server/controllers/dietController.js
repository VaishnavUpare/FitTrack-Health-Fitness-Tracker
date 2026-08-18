const Diet = require("../models/diet");

// ADD MEAL
exports.addMeal = async (req, res) => {
    try {
        const {
            mealType,
            foodName,
            calories,
            protein,
            carbs,
            fats,
            date
        } = req.body;

        if (!mealType || !foodName || calories === undefined) {
            return res.status(400).json({
                success: false,
                message: "Meal type, food name and calories are required"
            });
        }

        const meal = await Diet.create({
            user: req.user,
            mealType,
            foodName,
            calories,
            protein,
            carbs,
            fats,
            date
        });

        res.status(201).json({
            success: true,
            message: "Meal added successfully",
            meal
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET ALL MY MEALS
exports.getMeals = async (req, res) => {
    try {
        const meals = await Diet.find({
            user: req.user
        }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: meals.length,
            meals
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE MEAL
exports.updateMeal = async (req, res) => {
    try {
        const meal = await Diet.findOneAndUpdate(
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

        if (!meal) {
            return res.status(404).json({
                success: false,
                message: "Meal not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Meal updated successfully",
            meal
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE MEAL
exports.deleteMeal = async (req, res) => {
    try {
        const meal = await Diet.findOneAndDelete({
            _id: req.params.id,
            user: req.user
        });

        if (!meal) {
            return res.status(404).json({
                success: false,
                message: "Meal not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Meal deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};