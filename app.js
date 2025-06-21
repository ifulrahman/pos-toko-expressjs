const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/admin", authRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

const invoiceRoutes = require("./routes/invoiceRoutes");
app.use("/", invoiceRoutes);
app.get("/", (_, res) => {
  res.send("API Syaiful Toko running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
