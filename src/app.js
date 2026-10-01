
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./middleware/authRoutes");
const faqRoutes = require("./middleware/faqRoutes");
const aiRoutes = require("./middleware/aiRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/ai", aiRoutes);

// Error handling
app.use(errorMiddleware);

module.exports = app;
