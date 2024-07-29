const mongoose = require("mongoose");

const Food = mongoose.model(
  "Food",
  new mongoose.Schema(
    {
      food_name: { type: String, required: true, trim: true },
      restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
      },
      price: { type: Number, required: true },
      min_delivery_time: { type: Number, required: true },
      max_delivery_time: { type: Number, required: true },
      rating: { type: Number, min: 1, max: 5 },
      description: { type: String, required: true },
      veg_type: {
        type: Boolean,
        required: true,
      },
      food_image: {
        image: { type: String, required: true },
        publicId: { type: String, required: true },
      },
      offer: { type: Number, default: null },
      categorie: { type: String, required: true },
      sub_categorie: { type: String, required: true },
      feedbacks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Feedback",
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = Food;
