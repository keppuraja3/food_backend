const { cloudupload, cloudDistroy } = require("../helper/Cloudinary");
const Product = require("../models/ProductModel");

// Adding a new product ['/product/add'] ----
exports.AddProduct = [
  async (req, res) => {
    try {
      const {
        product_type,
        categories,
        hub_name,
        product_name,
        price,
        min_delivery_time,
        max_delivery_time,
        rating,
        description,
        offer,
      } = req.body;
      const { filename, path } = req.file;
      const imageUrl = await cloudupload(path);

      await Product.create({
        product_type,
        categories,
        hub_name,
        product_name,
        price,
        min_delivery_time,
        max_delivery_time,
        rating,
        description,
        product_image: { image: imageUrl.url, publicId: imageUrl.public_id },
        offer,
      });

      return res
        .status(201)
        .json({ status: true, message: "Product created successfully" });
    } catch (error) {
      console.log("Error on product adding: ", error);
      return res
        .status(500)
        .json({ status: false, message: "Error on creating product" });
    }
  },
];

// Get all food products ["/products/food/list"] ---
exports.GetFoodProducts = [
  async (req, res) => {
    const foodProducts = await Product.find({ product_type: "food" });

    if (!foodProducts || foodProducts.length === 0) {
      return res
        .status(500)
        .json({ status: false, message: "Food products not found" });
    }

    // console.log("food list: ", foodProducts);

    return res
      .status(200)
      .json({ status: true, message: "Food list success", data: foodProducts });
  },
];



// Deleting the product and cloudinary image ['/product/delete'] ----
exports.DeleteProduct = [
  async (req, res) => {
    const publicId = req.body.publicId;
    const productId = req.body.productId;

    try {
      await cloudDistroy(publicId);
      await Product.findByIdAndDelete(productId);

      return res
        .status(200)
        .json({ status: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting file from Cloudinary:", error);
      res.status(500).json({ status: false, message: "Error deleting file" });
    }
  },
];
