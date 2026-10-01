const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
{
question: {
type: String,
required: true,
trim: true
},


    answer: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    }
},
{
    timestamps: true
}


);

const FAQ =
mongoose.models.FAQ ||
mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
