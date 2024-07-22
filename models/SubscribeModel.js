const mongoose = require("mongoose");

const Subscriber = mongoose.model(
  "Subscriber",
  new mongoose.Schema(
    {
      email: { type: String, required: true, unique: true },
    },
    { timestamps: true }
  )
);
module.exports = Subscriber;
