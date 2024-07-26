const mongoose = require("mongoose")

const Food_Feedback = mongoose.model(
    'Food_Feedback',
    new mongoose.Schema({
        Food_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
        feedback: {type: String, required: true}
    },{timestamps: true})
)

module.exports = Food_Feedback