const express = require("express");
const router = express.Router();
const {
  checkout,
  getAllInvoices,
  deleteInvoiceById,
} = require("../controllers/invoiceController");
const authenticateToken = require("../middleware/authMiddleware");

// Public
router.post("/checkout", checkout);

// Admin only
router.get("/admin/invoices", authenticateToken, getAllInvoices);
router.delete("/admin/invoices/:id", authenticateToken, deleteInvoiceById);

module.exports = router;
