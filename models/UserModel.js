const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      mobileNo: { type: Number, required: true, unique: true },
      address: { type: String },
      feedbacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
      }],
      favorite:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }],
    },
    { timestamps: true }
  )
);

module.exports = User;
