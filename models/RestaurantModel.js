const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: {
    type: Number,
    required: true,
    minlength: 6,
    maxlength: 6,
    trim: true,
  },
});

const Restaurant = mongoose.model(
  "Restaurant",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      mobile_no: { type: Number, required: true, unique: true },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /.+\@.+\..+/,
      },
      address: addressSchema,
    },
    { timestamps: true }
  )
);

module.exports = Restaurant;
