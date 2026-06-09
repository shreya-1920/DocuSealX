const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const signatureRoutes = require(
  "./routes/signatureRoutes"
);

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Make uploaded files publicly accessible
app.use("/uploads", express.static("uploads"));

// Test Route
app.get("/", (req, res) => {
  res.send("DocuSealX Backend Running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);
app.use("/api/signatures", signatureRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});