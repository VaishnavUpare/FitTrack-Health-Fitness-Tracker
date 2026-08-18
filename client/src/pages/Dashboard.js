import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);


function Dashboard() {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const getDashboard = async () => {
            try {
                const response = await API.get("/dashboard");
                setDashboard(response.data.dashboard);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Could not load dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        getDashboard();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (loading) {
        return <h2>Loading dashboard...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

const calorieData = {
    labels: ["Calories"],
    datasets: [
        {
            label: "Calories Consumed",
            data: [dashboard?.totalCaloriesConsumed || 0],
            backgroundColor: "#22c55e"
        },
        {
            label: "Calories Burned",
            data: [dashboard?.totalCaloriesBurned || 0],
            backgroundColor: "#ef4444"
        }
    ]
};

const macroData = {
    labels: ["Protein", "Carbohydrates", "Fats"],
    datasets: [
        {
            data: [
                dashboard?.totalProtein || 0,
                dashboard?.totalCarbs || 0,
                dashboard?.totalFats || 0
            ],
            backgroundColor: [
                "#3b82f6",
                "#f59e0b",
                "#8b5cf6"
            ],
            borderWidth: 1
        }
    ]
};

    return (
        <div className="dashboard-page">

            <nav className="navbar">
                <h2>FitTrack</h2>

                <div className="nav-links">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/workouts">Workouts</Link>
                    <Link to="/diet">Diet</Link>
                    <Link to="/profile">Profile</Link>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className="dashboard-container">

                <div className="welcome-section">
                    <h1>Welcome, {user?.name} 👋</h1>
                    <p>Here is your health and fitness summary.</p>
                </div>

                <div className="stats-grid">

                    <div className="stat-card">
                        <h3>Total Workouts</h3>
                        <p>
                            {dashboard?.totalWorkouts || 0}
                        </p>
                    </div>

                    <div className="stat-card">
                        <h3>Workout Time</h3>
                        <p>
                            {dashboard?.totalWorkoutTime || 0} min
                        </p>
                    </div>

                    <div className="stat-card">
                        <h3>Calories Burned</h3>
                        <p>
                            {dashboard?.totalCaloriesBurned || 0} kcal
                        </p>
                    </div>

                    <div className="stat-card">
                        <h3>Calories Consumed</h3>
                        <p>
                            {dashboard?.totalCaloriesConsumed || 0} kcal
                        </p>
                    </div>

                    <div className="stat-card">
                        <h3>Net Calories</h3>
                        <p>
                            {dashboard?.netCalories || 0} kcal
                        </p>
                    </div>

                    <div className="stat-card">
                        <h3>Protein</h3>
                        <p>
                            {dashboard?.totalProtein || 0} g
                        </p>
                    </div>

                    <div className="stat-card">
                        <h3>Carbohydrates</h3>
                        <p>
                            {dashboard?.totalCarbs || 0} g
                        </p>
                    </div>

                    <div className="stat-card">
                        <h3>Fats</h3>
                        <p>
                            {dashboard?.totalFats || 0} g
                        </p>
                    </div>

                </div>

                <div className="goals-section">
    <h2>Goals Progress</h2>

    <div className="goal-item">
        <div className="goal-header">
            <span>Calories</span>
            <span>
                {dashboard?.totalCaloriesConsumed || 0} /
                {" "}
                {dashboard?.dailyCalorieGoal || 2000} kcal
            </span>
        </div>

        <div className="progress-bar">
            <div
                className="progress-fill"
                style={{
                    width: `${Math.min(
                        ((dashboard?.totalCaloriesConsumed || 0) /
                            (dashboard?.dailyCalorieGoal || 2000)) * 100,
                        100
                    )}%`
                }}
            />
        </div>
    </div>

    <div className="goal-item">
        <div className="goal-header">
            <span>Protein</span>
            <span>
                {dashboard?.totalProtein || 0} /
                {" "}
                {dashboard?.proteinGoal || 100} g
            </span>
        </div>

        <div className="progress-bar">
            <div
                className="progress-fill"
                style={{
                    width: `${Math.min(
                        ((dashboard?.totalProtein || 0) /
                            (dashboard?.proteinGoal || 100)) * 100,
                        100
                    )}%`
                }}
            />
        </div>
    </div>

    <div className="goal-item">
        <div className="goal-header">
            <span>Weekly Workouts</span>
            <span>
                {dashboard?.weeklyWorkoutCount || 0} /
                {" "}
                {dashboard?.weeklyWorkoutGoal || 4}
            </span>
        </div>

        <div className="progress-bar">
            <div
                className="progress-fill"
                style={{
                    width: `${Math.min(
                        ((dashboard?.weeklyWorkoutCount || 0) /
                            (dashboard?.weeklyWorkoutGoal || 4)) * 100,
                        100
                    )}%`
                }}
            />
        </div>
    </div>

<div className="goal-item">
    <div className="goal-header">
        <span>Weekly Workout Time</span>
        <span>
            {dashboard?.weeklyWorkoutTime || 0} /{" "}
            {dashboard?.weeklyWorkoutTimeGoal || 180} min
        </span>
    </div>

    <div className="progress-bar">
        <div
            className="progress-fill"
            style={{
                width: `${Math.min(
                    ((dashboard?.weeklyWorkoutTime || 0) /
                        (dashboard?.weeklyWorkoutTimeGoal || 180)) * 100,
                    100
                )}%`
            }}
        />
    </div>ss
</div>
</div>

               <div className="chart-section">
    <h2>Calories Overview</h2>

    <div className="chart-container">
        <Bar
            data={calorieData}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top"
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) =>
                                `${context.dataset.label}: ${context.raw} kcal`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Calories (kcal)"
                        }
                    }
                }
            }}
        />
    </div>
</div>

<div className="chart-section">
    <h2>Macronutrient Breakdown</h2>

    <div className="macro-chart-container">
        <Doughnut
            data={macroData}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom"
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) =>
                                `${context.label}: ${context.raw} g`
                        }
                    }
                }
            }}
        />
    </div>
</div>

                <div className="activity-grid">

                    <div className="activity-section">
                        <h2>Recent Workouts</h2>

                        {dashboard?.recentWorkouts?.length > 0 ? (
                            dashboard.recentWorkouts.map((workout) => (
                                <div
                                    className="activity-card"
                                    key={workout._id}
                                >
                                    <h3>{workout.exercise}</h3>

                                    <p>
                                        Category: {workout.category}
                                    </p>

                                    <p>
                                        Duration: {workout.duration} min
                                    </p>

                                    <p>
                                        Calories: {workout.caloriesBurned} kcal
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No workouts added yet.</p>
                        )}
                    </div>

                    <div className="activity-section">
                        <h2>Recent Meals</h2>

                        {dashboard?.recentMeals?.length > 0 ? (
                            dashboard.recentMeals.map((meal) => (
                                <div
                                    className="activity-card"
                                    key={meal._id}
                                >
                                    <h3>{meal.foodName}</h3>

                                    <p>
                                        Meal: {meal.mealType}
                                    </p>

                                    <p>
                                        Calories: {meal.calories} kcal
                                    </p>

                                    <p>
                                        Protein: {meal.protein} g
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No meals added yet.</p>
                        )}
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;