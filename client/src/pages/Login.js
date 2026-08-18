import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
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
            const response = await API.post("/auth/login", form);

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

        } catch (error) {
    console.log("LOGIN ERROR:", error);
    console.log("SERVER RESPONSE:", error.response?.data);

    setMessage(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
    );
}
    }

    return (
    <div className="auth-page">
        <div className="auth-card">

            <h1>Welcome Back</h1>
            <p>Login to continue your fitness journey.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
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
                    Login
                </button>
            </form>

            <p className="auth-message">{message}</p>

            <div className="auth-link">
                Don't have an account?{" "}
                <Link to="/register">Register</Link>
            </div>

        </div>
    </div>
);
}

export default Login;