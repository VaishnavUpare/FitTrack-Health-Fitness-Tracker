import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function Profile() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        goal: "Maintain Fitness",
        dailyCalorieGoal: 2000,
        proteinGoal: 100,
        weeklyWorkoutGoal: 4,
        weeklyWorkoutTimeGoal: 180
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await API.get("/profile");

                setForm(response.data.user);
            } catch (error) {
                console.error(error);
                setMessage("Could not load profile");
            }
        };

        loadProfile();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.put("/profile", {
                ...form,
                age: Number(form.age),
                height: Number(form.height),
                weight: Number(form.weight),
                dailyCalorieGoal: Number(form.dailyCalorieGoal),
                proteinGoal: Number(form.proteinGoal),
                weeklyWorkoutGoal: Number(form.weeklyWorkoutGoal),
                weeklyWorkoutTimeGoal: Number(form.weeklyWorkoutTimeGoal)
            });

            setForm(response.data.user);
            setMessage("Profile updated successfully");
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Could not update profile"
            );
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
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
                    <h1>Profile & Goals</h1>
                    <p>Manage your personal details and fitness targets.</p>
                </div>

                <form className="profile-form" onSubmit={handleSubmit}>

                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name || ""}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={form.age || ""}
                        onChange={handleChange}
                        min="5"
                        max="120"
                
                    />

                    <select
                        name="gender"
                        value={form.gender || ""}
                        onChange={handleChange}
                    >
                        <option value="">Select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>

                    <input
                        type="number"
                        name="height"
                        placeholder="Height (cm)"
                        value={form.height || ""}
                        onChange={handleChange}
                        min="50"
                        max="300"
                    />

                    <input
                        type="number"
                        name="weight"
                        placeholder="Weight (kg)"
                        value={form.weight || ""}
                        onChange={handleChange}
                        min="20"
                        max="500"
                    />

                    <select
                        name="goal"
                        value={form.goal || "Maintain Fitness"}
                        onChange={handleChange}
                    >
                        <option>Weight Loss</option>
                        <option>Muscle Gain</option>
                        <option>Maintain Fitness</option>
                    </select>

                    <input
                        type="number"
                        name="dailyCalorieGoal"
                        placeholder="Daily calorie goal"
                        value={form.dailyCalorieGoal || ""}
                        onChange={handleChange}
                        min="500"
                        max="10000"
                    />

                    <input
                        type="number"
                        name="proteinGoal"
                        placeholder="Protein goal (g)"
                        value={form.proteinGoal || ""}
                        onChange={handleChange}
                        min="0"
                        max="1000"
                    />

                    <input
                        type="number"
                        name="weeklyWorkoutGoal"
                        placeholder="Weekly workout goal"
                        value={form.weeklyWorkoutGoal || ""}
                        onChange={handleChange}
                        min="0"
                        max="100"
                    />

                    <input
                        type="number"
                        name="weeklyWorkoutTimeGoal"
                        placeholder="Weekly workout time goal"
                        value={form.weeklyWorkoutTimeGoal || ""}
                        onChange={handleChange}
                        min="1"
                        max="1000"
                    />

                    <button type="submit">
                        Save Profile
                    </button>

                </form>

                <p className="tracker-message">
                    {message}
                </p>

            </div>
        </div>
    );
}

export default Profile;