const Restaurant = require("../models/RestaurantModel");
const { cloudUpload, cloudDistroy } = require("../helper/Cloudinary");

// Add new restaurant ["/restaurant/add"]---
exports.addRestaurant = [
  async (req, res) => {
    try {
      const {
        restaurant_name,
        restaurant_email,
        restaurant_mobile_no,
        street,
        city,
        state,
        pincode,
        owner_name,
        owner_email,
        owner_mobile_no,
      } = req.body;
      const { filename, path } = req.file;

      const isExist = await Restaurant.findOne({ restaurant_email });
      if (isExist)
        return res
          .status(409)
          .send("Credentials already exits");

      const imageUrl = await cloudUpload(path);

      await Restaurant.create({
        restaurant_name,
        restaurant_email,
        restaurant_mobile_no,
        restaurant_address: {
          street,
          city,
          state,
          pincode,
        },
        restaurant_logo: { image: imageUrl.url, publicId: imageUrl.public_id },
        owner_name,
        owner_email,
        owner_mobile_no,
      });
      return res
        .status(201)
        .json({ status: true, message: "Restaurant Added" });
    } catch (error) {
      console.log("Error on add Restaurant: ", error);
      return res.status(500).send(error.message);
    }
  },
];
