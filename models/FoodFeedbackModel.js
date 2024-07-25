const mongoose = require("mongoose")

const Food_Feedback = mongoose.model(
    'Food_Feedback',
    new mongoose.Schema({
        Food_id: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        },
        user_id: {
            required:true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        feedback: {type: String, required: true}
    },{timestamps: true})
)

module.exports = Food_Feedback