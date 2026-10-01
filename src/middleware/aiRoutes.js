const express = require("express");
const FAQ = require("../models/FAQ");

const router = express.Router();

router.post("/ask", async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || !question.trim()) {
            return res.status(400).json({
                message: "Question is required"
            });
        }

        const searchText = question.trim();

        const faq = await FAQ.findOne({
            $or: [
                {
                    question: {
                        $regex: searchText,
                        $options: "i"
                    }
                },
                {
                    answer: {
                        $regex: searchText,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: searchText,
                        $options: "i"
                    }
                }
            ]
        });

        if (faq) {
            return res.json({
                answer: faq.answer,
                source: "FAQ Database"
            });
        }

        return res.json({
            answer:
                "Sorry, I could not find an answer to your question in our FAQ database.",
            source: "AnswerBot"
        });

    } catch (error) {
        console.error("AI Error:", error);

        res.status(500).json({
            message: "Failed to process your question",
            error: error.message
        });
    }
});

module.exports = router;