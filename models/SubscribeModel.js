const mongoose = require("mongoose");

const Subscriber = mongoose.model(
  "Subscriber",
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /.+\@.+\..+/,
      },
    },
    { timestamps: true }
  )
);
module.exports = Subscriber;
