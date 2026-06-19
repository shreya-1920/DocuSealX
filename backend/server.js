const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const signatureRoutes = require("./routes/signatureRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folders
app.use("/uploads", express.static("uploads"));
app.use("/signed", express.static("signed"));

// Home Route
app.get("/", (req, res) => {
res.send("DocuSealX Backend Running 🚀");
});

app.get("/test-db", async (req, res) => {
  try {
    const User = require("./models/User");

    const count = await User.countDocuments();

    res.json({
      success: true,
      count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);
app.use("/api/signatures", signatureRoutes);
app.use("/api/pdf", pdfRoutes);


// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(
`🚀 Server running on port ${PORT}`
);
});
