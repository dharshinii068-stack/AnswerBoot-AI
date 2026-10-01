const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// ================================
// REGISTER
// ================================
router.post("/register", async (req, res) => {
try {
const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    const existingUser = await User.findOne({
        email: email.toLowerCase()
    });

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const user = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password
    });

    res.status(201).json({
        message: "Registration successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });

} catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
        message: "Registration failed",
        error: error.message
    });
}


});

// ================================
// LOGIN
// ================================
router.post("/login", async (req, res) => {
try {
const { email, password } = req.body;

```
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const user = await User.findOne({
        email: email.toLowerCase().trim()
    });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET || "answerbot_secret_123",
        {
            expiresIn: "1d"
        }
    );

    res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });

} catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
        message: "Login failed",
        error: error.message
    });


});

// ================================
// EXPORT ROUTER
// ================================
module.exports = router;
