const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // load .env at the very top

const authRoutes = require("./routes/auth");
const forgotPasswordRoutes = require("./routes/ForgotPassword");
const inventoryRoutes = require("./routes/inventory");
const customersRoutes = require("./routes/customers");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Enable CORS for your React dev server
app.use(cors({
  origin: "http://localhost:5173",   // React dev server
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Parse JSON
app.use(express.json());

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", forgotPasswordRoutes);

// Inventory routes
app.use("/api/inventory", inventoryRoutes);

// Customers API
app.use("/api/customers", customersRoutes);

// Protected route example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "You accessed a protected route!", user: req.user });
});

// Handle preflight requests explicitly
app.options("*", cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));