const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      product_name: { type: String, required: true },
      price: { type: Number, required: true },
      delivery_time: { type: Number, required: true },
      rating: { type: Number },
      description: { type: String, required: true },
      product_image: {
        type: mongoose.Schema.Types.Mixed, // Can store any type of data
        default: {},
        required: true,
      },
      product_type: { type: String, required: true },
      offer: { type: Number, default: null },
      categories: { type: String, required: true },
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

module.exports = Product;
