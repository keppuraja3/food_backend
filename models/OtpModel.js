const mongoose = require("mongoose");

const UserOtp = mongoose.model(
  "userOtp",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: {
        type: String,
        required: true,
        lowercase: true,
        match: /.+\@.+\..+/,
      },
      mobileNo: { type: Number, required: true },
      otp: { type: Number, required: true, minlength: 6, maxlength: 6 },
    },
    { timestamps: true }
  )
);

module.exports = UserOtp;
