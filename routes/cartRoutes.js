const express = require("express");
const router = express.Router();
const {
  addToCart,
  getAllCarts,
  deleteCartById,
} = require("../controllers/cartController");
const authenticateToken = require("../middleware/authMiddleware");

// PUBLIC
router.post("/", addToCart);

// ADMIN
router.get("/admin", authenticateToken, getAllCarts);
router.delete("/admin/:id", authenticateToken, deleteCartById);

module.exports = router;
