const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");


// Test
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth route works!"
    });
});


// Register
router.post("/register", register);


// Login
router.post("/login", login);


// Protected profile
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const User = require("../models/user");

        const user = await User.findById(req.user).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


module.exports = router;