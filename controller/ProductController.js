const { cloudupload, cloudDistroy } = require("../helper/Cloudinary");
const Product = require("../models/ProductModel");

exports.AddProduct = [
  async (req, res) => {
    try {
      const {
        product_type,
        categories,
        product_name,
        price,
        delivery_time,
        rating,
        description,
        offer,
      } = req.body;
      const { filename, path } = req.file;
      const imageUrl = await cloudupload(path);

      await Product.create({
        product_type,
        categories,
        product_name,
        price,
        delivery_time,
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

// Deleting the product and cloudinary image ['/product/delete/:productId/:publicId'] ----
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
