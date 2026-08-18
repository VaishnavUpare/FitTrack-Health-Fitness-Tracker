const Workout = require("../models/workout");
const Diet = require("../models/diet");
const User = require("../models/user");

exports.getDashboard = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user });
        const meals = await Diet.find({ user: req.user });

        const user = await User.findById(req.user);

// Start of the current week
const startOfWeek = new Date();

const day = startOfWeek.getDay();

const difference =
    startOfWeek.getDate() - day + (day === 0 ? -6 : 1);

startOfWeek.setDate(difference);
startOfWeek.setHours(0, 0, 0, 0);

// Only workouts from this week
const weeklyWorkouts = workouts.filter(
    (workout) => new Date(workout.date) >= startOfWeek
);

const weeklyWorkoutCount = weeklyWorkouts.length;

const weeklyWorkoutTime = weeklyWorkouts.reduce(
    (total, workout) => total + (workout.duration || 0),
    0
);

        const totalWorkouts = workouts.length;

        const totalCaloriesBurned = workouts.reduce(
            (total, workout) => total + (workout.caloriesBurned || 0),
            0
        );

        const totalCaloriesConsumed = meals.reduce(
            (total, meal) => total + (meal.calories || 0),
            0
        );

        const totalWorkoutTime = workouts.reduce(
            (total, workout) => total + (workout.duration || 0),
         0
     );

        const netCalories = totalCaloriesConsumed - totalCaloriesBurned;

        const totalProtein = meals.reduce(
            (total, meal) => total + (meal.protein || 0),
            0
        );

        const totalCarbs = meals.reduce(
            (total, meal) => total + (meal.carbs || 0),
            0
        );

        const totalFats = meals.reduce(
            (total, meal) => total + (meal.fats || 0),
            0
        );

        const recentWorkouts = await Workout.find({
            user: req.user
        })
            .sort({ date: -1 })
            .limit(5);

        const recentMeals = await Diet.find({
            user: req.user
        })
            .sort({ date: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            dashboard: {
                totalWorkouts,
                totalCaloriesBurned,
                totalCaloriesConsumed,
                totalWorkoutTime,
                netCalories,
                totalProtein,
                totalCarbs,
                totalFats,
                weeklyWorkoutCount,
                weeklyWorkoutTime,

                dailyCalorieGoal: user?.dailyCalorieGoal || 2000,
                proteinGoal: user?.proteinGoal || 100,
                weeklyWorkoutGoal: user?.weeklyWorkoutGoal || 4,
                weeklyWorkoutTimeGoal: user?.weeklyWorkoutTimeGoal || 180,

                recentWorkouts,
                recentMeals

            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};