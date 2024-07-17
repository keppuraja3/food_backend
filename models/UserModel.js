const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      mobileNo: { type: Number, required: true, unique: true },
      address: { type: String },
    },
    { timestamps: true }
  )
);

module.exports = User;
