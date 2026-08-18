import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/auth/register", form);

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
    console.log("REGISTER ERROR:", error);
    console.log("SERVER RESPONSE:", error.response?.data);

    setMessage(
        error.response?.data?.message ||
        error.message ||
        "Registration failed"
    );
}
    };

    return (
    <div className="auth-page">
        <div className="auth-card">

            <h1>Create Account</h1>
            <p>Start tracking your health and fitness.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Register
                </button>
            </form>

            <p className="auth-message">{message}</p>

            <div className="auth-link">
                Already have an account?{" "}
                <Link to="/login">Login</Link>
            </div>

        </div>
    </div>
);
}

export default Register;