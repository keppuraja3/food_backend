const mongoose = require("mongoose");

// Define the address schema ---
const addressSchema = mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: {
    type: Number,
    minlength: 6,
    maxlength: 6,
    trim: true,
  },
});

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /.+\@.+\..+/,
      },
      mobileNo: { type: Number, required: true, unique: true },
      image: { type: String },
      role: { type: String, default: "user", enum: ["user", "admin"] },
      address: [addressSchema],
      otpId: { type: mongoose.Schema.Types.ObjectId, ref: "userOtp" },
      favorites: [
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
