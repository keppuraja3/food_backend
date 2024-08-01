const Food = require("../models/FoodModel");
const {
  cloudUpload,
  cloudDistroy,
  cloudUpdate,
} = require("../helper/Cloudinary");

// Adding a new food ['/food/add'] ----
exports.AddFood = [
  async (req, res) => {
    try {
      const {
        food_name,
        restaurant,
        price,
        min_delivery_time,
        max_delivery_time,
        rating,
        description,
        veg_type,
        offer,
        categorie,
        sub_categorie,
      } = req.body;
      const { filename, path } = req.file;
      const imageUrl = await cloudUpload(path);

      await Food.create({
        food_name,
        restaurant,
        price,
        min_delivery_time,
        max_delivery_time,
        rating,
        description,
        veg_type,
        offer,
        categorie,
        sub_categorie,
        food_image: { image: imageUrl.url, publicId: imageUrl.public_id },
      });

      return res.status(201).json({ status: true, message: "Food Added" });
    } catch (error) {
      console.log("Error on food adding: ", error);
      return res
        .status(500)
        .send("Error on creating food");
    }
  },
];

// Get all food list ["/food/list"] ---
exports.GetFoodList = [
  async (req, res) => {
    try {
      // Get food list with only restaurant id ---
      const foodList = await Food.find();

      // Get food list with full restaurant details ---
      // const foodList = await Food.find().populate("restaurant")

      if (!foodList || foodList.length === 0) {
        return res
          .status(500)
          .json({ status: false, message: "Food list not found" });
      }

      // console.log("food list: ", foodList);

      return res
        .status(200)
        .json({ status: true, message: "Food list success", data: foodList });
    } catch (error) {
      console.log("Error on get food list: ", error.message);
      return res.status(500).send(error.message);
    }
  },
];

// Update food details ['/food/update/:foodId] ---
exports.UpdateFood = [
  async (req, res) => {
    try {
      const {
        food_name,
        restaurant,
        price,
        min_delivery_time,
        max_delivery_time,
        rating,
        description,
        veg_type,
        offer,
        categorie,
        sub_categorie,
      } = req.body;

      const foodId = req.params.foodId;
      const food = await Food.findById(foodId);

      if (!food) {
        return res
          .status(404)
          .send("Food not found");
      }

      let updatedFields = {
        food_name,
        restaurant,
        price,
        min_delivery_time,
        max_delivery_time,
        rating,
        description,
        veg_type,
        offer,
        categorie,
        sub_categorie,
      };

      // Check if a new image is provided
      if (req.file) {
        const { path } = req.file;
        const imageUrl = await cloudUpdate(food.food_image.publicId, path);
        console.log(food.food_image.publicId);

        // Delete the old image from Cloudinary if it exists
        updatedFields.food_image = {
          image: imageUrl.url,
          publicId: imageUrl.public_id,
        };
      }

      console.log("updatedFields", updatedFields);
      // Update the food product in the database
      await Food.findByIdAndUpdate(foodId, updatedFields);

      return res.status(200).json({ status: true, message: "Food Updated" });
    } catch (error) {
      console.log("Error on food updating: ", error);
      return res
        .status(500)
        .send("Error on updating food");
    }
  },
];

// Deleting the food and cloudinary image ['/food/delete/:foodId'] ----
exports.DeleteFood = [
  async (req, res) => {
    const foodId = req.params.foodId;
    const food = await Food.findById(foodId);

    if (!food)
      return res.status(404).send("Food not found");

    const publicId = food.food_image.publicId;
    try {
      await cloudDistroy(publicId);
      await Food.findByIdAndDelete(foodId);

      return res.status(200).json({ status: true, message: "Food deleted" });
    } catch (error) {
      console.error("Error deleting file from Cloudinary:", error);
      res.status(500).send("Error deleting file");
    }
  },
];
