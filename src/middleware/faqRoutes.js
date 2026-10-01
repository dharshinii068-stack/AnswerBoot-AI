const express = require("express");
const FAQ = require("./FAQ");
const authMiddleware = require("./authMiddleware");

const router = express.Router();

// Create FAQ
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { question, answer, category } = req.body;

        if (!question || !answer || !category) {
            return res.status(400).json({
                message: "Question, answer and category are required"
            });
        }

        const faq = await FAQ.create({
            question,
            answer,
            category,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "FAQ created successfully",
            faq
        });
    } catch (error) {
        console.error("Create FAQ error:", error);

        res.status(500).json({
            message: "Failed to create FAQ",
            error: error.message
        });
    }
});

// Get all FAQs
router.get("/", async (req, res) => {
    try {
        const faqs = await FAQ.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.json(faqs);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch FAQs",
            error: error.message
        });
    }
});

// Search FAQs
router.get("/search", async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                message: "Search query is required"
            });
        }

        const faqs = await FAQ.find({
            $or: [
                { question: { $regex: q, $options: "i" } },
                { answer: { $regex: q, $options: "i" } },
                { category: { $regex: q, $options: "i" } }
            ]
        });

        res.json(faqs);
    } catch (error) {
        res.status(500).json({
            message: "Search failed",
            error: error.message
        });
    }
});

// Update FAQ
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const faq = await FAQ.findOne({
            _id: req.params.id,
            createdBy: req.user.id
        });

        if (!faq) {
            return res.status(404).json({
                message: "FAQ not found or you are not authorized"
            });
        }

        const { question, answer, category } = req.body;

        faq.question = question || faq.question;
        faq.answer = answer || faq.answer;
        faq.category = category || faq.category;

        await faq.save();

        res.json({
            message: "FAQ updated successfully",
            faq
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update FAQ",
            error: error.message
        });
    }
});

// Delete FAQ
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const faq = await FAQ.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.id
        });

        if (!faq) {
            return res.status(404).json({
                message: "FAQ not found or you are not authorized"
            });
        }

        res.json({
            message: "FAQ deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete FAQ",
            error: error.message
        });
    }
});

module.exports = router;