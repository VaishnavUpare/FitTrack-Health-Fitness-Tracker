import { useEffect, useState } from "react";
import API from "../services/api";
import "./Tracker.css";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Diet() {
    const [form, setForm] = useState({
        mealType: "Breakfast",
        foodName: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: ""
    });
    
    const [editingId, setEditingId] = useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
};

    const [meals, setMeals] = useState([]);
    const [message, setMessage] = useState("");

    const loadMeals = async () => {
        try {
            const response = await API.get("/diet");
            setMeals(response.data.meals);
        } catch (error) {
            console.error("Load meals error:", error);
        }
    };

    useEffect(() => {
        loadMeals();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = (meal) => {
    setEditingId(meal._id);

    setForm({
        mealType: meal.mealType,
        foodName: meal.foodName,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats
    });
};

//submit function for diet form
const handleSubmit = async (e) => {
    e.preventDefault();

    const mealData = {
        ...form,
        calories: Number(form.calories),
        protein: Number(form.protein),
        carbs: Number(form.carbs),
        fats: Number(form.fats)
    };

    try {
        if (editingId) {
            await API.put(`/diet/${editingId}`, mealData);
            setMessage("Meal updated successfully");
        } else {
            await API.post("/diet", mealData);
            setMessage("Meal added successfully");
        }

        setForm({
            mealType: "Breakfast",
            foodName: "",
            calories: "",
            protein: "",
            carbs: "",
            fats: ""
        });

        setEditingId(null);

        loadMeals();

    } catch (error) {
        console.log("MEAL ERROR:", error);
        console.log("SERVER RESPONSE:", error.response?.data);

        setMessage(
            error.response?.data?.message ||
            error.message ||
            "Something went wrong"
        );
    }
};

//delete function for diet form
const handleDelete = async (id) => {
    try {
        await API.delete(`/diet/${id}`);

        setEditingId(null);

        setForm({
            mealType: "Breakfast",
            foodName: "",
            calories: "",
            protein: "",
            carbs: "",
            fats: ""
        });

        setMessage("Meal deleted successfully");

        loadMeals();

    } catch (error) {
        setMessage(
            error.response?.data?.message ||
            "Could not delete meal"
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

            <h1>Diet Tracker</h1>

            <form className="tracker-form" onSubmit={handleSubmit}>

                <select
                    name="mealType"
                    value={form.mealType}
                    onChange={handleChange}
                >
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Snack</option>
                </select>

                <input
                    name="foodName"
                    placeholder="Food name"
                    value={form.foodName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="calories"
                    placeholder="Calories"
                    value={form.calories}
                    onChange={handleChange}
                    min="0"
                    max="10000"
                    required
                />

                <input
                    type="number"
                    name="protein"
                    placeholder="Protein (g)"
                    value={form.protein}
                    onChange={handleChange}
                    min="0"
                    max="1000"
                    required
                />

                <input
                    type="number"
                    name="carbs"
                    placeholder="Carbohydrates (g)"
                    value={form.carbs}
                    onChange={handleChange}
                    min="0"
                    max="1000"
                />

                <input
                    type="number"
                    name="fats"
                    placeholder="Fats (g)"
                    value={form.fats}
                    onChange={handleChange}
                    min="0"
                    max="1000"
                />

                <button type="submit">
                    {editingId ? "Update Meal" : "Add Meal"}
                </button>

            </form>

            <p className="tracker-message">
                {message}
            </p>

<div className="tracker-list">
    <h2>My Meals</h2>

    {meals.length === 0 ? (
        <p>No meals yet.</p>
    ) : (
        meals.map((meal) => (
            <div
                className="tracker-card"
                key={meal._id}
            >
                <h3>{meal.foodName}</h3>

                <p>Meal: {meal.mealType}</p>
                <p>Calories: {meal.calories} kcal</p>
                <p>Protein: {meal.protein} g</p>
                <p>Carbohydrates: {meal.carbs} g</p>
                <p>Fats: {meal.fats} g</p>

            <div className="meal-actions">
                <button
                    className="edit-btn"
                    onClick={() => handleEdit(meal)}
                >
                    Edit
                </button>

                 <button
                    className="delete-btn"
                    onClick={() => handleDelete(meal._id)}
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

export default Diet;