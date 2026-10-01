const mongoose = require("mongoose");
const FAQ = require("./models/FAQ");

const MONGO_URI = "mongodb://127.0.0.1:27017/answerbot";

const faqs = [
    {
        question: "What is your return policy?",
        answer: "You can return an eligible product within 7 days of delivery.",
        category: "Returns"
    },
    {
        question: "How long does delivery take?",
        answer: "Delivery usually takes 3 to 5 business days.",
        category: "Delivery"
    },
    {
        question: "How can I track my order?",
        answer: "You can track your order using the tracking link provided after your order is shipped.",
        category: "Orders"
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept credit cards, debit cards, UPI and net banking.",
        category: "Payment"
    },
    {
        question: "Can I cancel my order?",
        answer: "Yes, you can cancel your order before it is shipped.",
        category: "Orders"
    }
];

async function seedFAQs() {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("MongoDB connected");

        await FAQ.deleteMany({});

        await FAQ.insertMany(faqs);

        console.log("FAQ data added successfully");

        process.exit(0);
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
}

seedFAQs();