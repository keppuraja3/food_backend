const { cloudupload, cloudDistroy } = require("../helper/Cloudinary");
const Food = require("../models/FoodModel");

// Adding a new food ['/food/add'] ----
exports.AddFood = [
  async (req, res) => {
    try {
      const {
        food_name,
        restaurant_name,
        price,
        min_delivery_time,
        max_delivery_time,
        rating,
        description,
        veg_type,
        offer,
        categories,
        sub_categorie,
      } = req.body;
      const { filename, path } = req.file;
      const imageUrl = await cloudupload(path);

      await Food.create({
        food_name,
        restaurant_name,
        price,
        min_delivery_time,
        max_delivery_time,
        rating,
        description,
        veg_type,
        offer,
        categories,
        sub_categorie,
        food_image: { image: imageUrl.url, publicId: imageUrl.public_id },
      });

      return res.status(201).json({ status: true, message: "Food Added" });
    } catch (error) {
      console.log("Error on food adding: ", error);
      return res
        .status(500)
        .json({ status: false, message: "Error on creating food" });
    }
  },
];

// Get all food list ["/food/list"] ---
exports.GetFoodList = [
  async (req, res) => {
    const foodList = await Food.find();

    if (!foodList || foodList.length === 0) {
      return res
        .status(500)
        .json({ status: false, message: "Food list not found" });
    }

    // console.log("food list: ", foodList);

    return res
      .status(200)
      .json({ status: true, message: "Food list success", data: foodList });
  },
];

// Deleting the food and cloudinary image ['/food/delete'] ----
exports.DeleteFood = [
  async (req, res) => {
    const publicId = req.body.publicId;
    const FoodId = req.body.FoodId;

    try {
      await cloudDistroy(publicId);
      await Food.findByIdAndDelete(FoodId);

      return res.status(200).json({ status: true, message: "Food deleted" });
    } catch (error) {
      console.error("Error deleting file from Cloudinary:", error);
      res.status(500).json({ status: false, message: "Error deleting file" });
    }
  },
];
