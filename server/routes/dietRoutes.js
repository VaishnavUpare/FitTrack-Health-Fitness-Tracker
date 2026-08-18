const express = require("express");

const router = express.Router();

const {
    addMeal,
    getMeals,
    updateMeal,
    deleteMeal
} = require("../controllers/dietController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addMeal);
router.get("/", authMiddleware, getMeals);
router.put("/:id", authMiddleware, updateMeal);
router.delete("/:id", authMiddleware, deleteMeal);

module.exports = router;