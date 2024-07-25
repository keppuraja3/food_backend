const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true, lowercase: true },
      mobileNo: { type: Number, required: true, unique: true },
      role: { type: String, default: "user", enum: ["user", "admin"] },
      address: [
        {
          street: { type: String, required: true },
          city: { type: String, required: true },
          pincode: { type: Number, required: true, min: 6, max: 6 },
        },
      ],
      food_feedbacks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food_Feedback",
        },
      ],
      food_favorite: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = User;
