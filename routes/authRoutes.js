const express = require("express");
const router = express.Router();

// Controller functions
const { register, login, logout } = require("../controllers/authController");

// Middleware
const authenticateToken = require("../middleware/authMiddleware");

// Routes
router.post("/register", register); // POST /admin/register
router.post("/login", login); // POST /admin/login
router.post("/logout", authenticateToken, logout); // POST /admin/logout (JWT required)

module.exports = router;
