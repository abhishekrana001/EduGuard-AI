const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// ⭐ ADD THIS LINE (VERY IMPORTANT)
app.use(express.static("public"));

// 📂 Routes
const chatRoute = require("./routes/chat");
const checkerRoute = require("./routes/checker");

app.use("/api/chat", chatRoute);
app.use("/api/check", checkerRoute);

// 🏠 Test route
app.get("/", (req, res) => {
    res.send("🚀 EduGuard AI Server is Running...");
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});