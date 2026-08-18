import { useEffect, useState } from "react";
import API from "../services/api";
import "./Tracker.css";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Workouts() {
    const [form, setForm] = useState({
        exercise: "",
        category: "",
        duration: "",
        caloriesBurned: "",
        notes: ""
        
    });
    const [editingId, setEditingId] = useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
       localStorage.removeItem("token");
       localStorage.removeItem("user");
       navigate("/login");
};

    const [workouts, setWorkouts] = useState([]);
    const [message, setMessage] = useState("");

    const loadWorkouts = async () => {
        try {
            const response = await API.get("/workouts");
            setWorkouts(response.data.workouts);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadWorkouts();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = (workout) => {
        setEditingId(workout._id);

        setForm({
            exercise: workout.exercise,
            category: workout.category,
            duration: workout.duration,
            caloriesBurned: workout.caloriesBurned,
            notes: workout.notes
        });
    };


const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (editingId) {
            await API.put(`/workouts/${editingId}`, form);
            setMessage("Workout updated successfully");
        } else {
            await API.post("/workouts", form);
            setMessage("Workout added successfully");
        }

        setForm({
            exercise: "",
            category: "",
            duration: "",
            caloriesBurned: "",
            notes: ""
        });

        setEditingId(null);
        loadWorkouts();

    } catch (error) {
        console.error(error);
        setMessage("Something went wrong");
    }
};
const handleDelete = async (id) => {
    try {
        await API.delete(`/workouts/${id}`);

        setEditingId(null);

        setForm({
            exercise: "",
            category: "Cardio",
            duration: "",
            caloriesBurned: "",
            notes: ""
        });

        setMessage("Workout deleted successfully");

        loadWorkouts();

    } catch (error) {
        setMessage(
            error.response?.data?.message ||
            "Could not delete workout"
        );
    }
};

    return (
    <div className="tracker-page">

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

        <div className="tracker-container">

            <h1>Workout Tracker</h1>

            <form className="tracker-form" onSubmit={handleSubmit}>

                <input
                    name="exercise"
                    placeholder="Exercise"
                    value={form.exercise}
                    onChange={handleChange}
                    maxLength="60"
                    required
                />

                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                >
                    <option value=""disabled>
                        Select Workout Category
                    </option>
                
                    <option value="Cardio">Cardio</option>
                    <option value="Strength">Strength</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="number"
                    name="duration"
                    placeholder="Duration in minutes"
                    value={form.duration}
                    onChange={handleChange}
                    min="1"
                    max="1440"
                    required
                />

                <input
                    type="number"
                    name="caloriesBurned"
                    placeholder="Calories burned"
                    value={form.caloriesBurned}
                    onChange={handleChange}
                    min="0"
                    max="10000"
                    required
                />

                <textarea
                    name="notes"
                    placeholder="Notes"
                    value={form.notes}
                    onChange={handleChange}
                    maxLength="300"
                ></textarea>

                <button type="submit">
                    {editingId ? "Update Workout" : "Add Workout"}
                </button>
            </form>

            <p className="tracker-message">
                {message}
            </p>

            <div className="tracker-list">
                <h2>My Workouts</h2>

                {workouts.length === 0 ? (
                    <p>No workouts yet.</p>
                ) : (
                    workouts.map((workout) => (
                        <div
                            className="tracker-card"
                            key={workout._id}
                        >
                            <h3>{workout.exercise}</h3>
                            <p>Category: {workout.category}</p>
                            <p>Duration: {workout.duration} minutes</p>
                            <p>
                                Calories: {workout.caloriesBurned} kcal
                            </p>

                            {workout.notes && (
                                <p>Notes: {workout.notes}</p>
                            )}

                           <div className="workout-actions">
                                <button
                                  className="edit-btn"
                                  onClick={() => handleEdit(workout)}
                                >
                                   Edit
                               </button>

                                <button
                                  className="delete-btn"
                                  onClick={() => handleDelete(workout._id)}
                                >
                                  Delete
                                </button>
                                </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    </div>
);
       
}    
    
    export default Workouts;