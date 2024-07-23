const mongoose = require("mongoose")

const Feedback = mongoose.model(
    'Feedback',
    new mongoose.Schema({
        product_id: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        user_id: {
            required:true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        feedback: {type: String, required: true}
    },{timestamps: true})
)