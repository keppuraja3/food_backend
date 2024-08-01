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

const imageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  publicId: { type: String, required: true },
});

const Restaurant = mongoose.model(
  "Restaurant",
  new mongoose.Schema(
    {
      restaurant_name: { type: String, required: true },
      restaurant_mobile_no: { type: Number, required: true, unique: true },
      restaurant_email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /.+\@.+\..+/,
      },
      restaurant_address: addressSchema,
      restaurant_logo: imageSchema,
      restaurant_banner: imageSchema,
      restaurant_rating: { type: Number, min: 1, max: 5, default: null },
      owner_name: { type: String, required: true },
      owner_email: { type: String, required: true, unique: true },
      owner_mobile_no: { type: String, required: true, unique: true },
    },
    { timestamps: true }
  )
);

module.exports = Restaurant;
