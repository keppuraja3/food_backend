const express = require("express")
const router = express.Router()

const ProductController = require("../controller/ProductController")
const multerhelper = require("../helper/Cloudinary");

// Add Product data with image ---
router.post("/product/add",multerhelper.multerupload.single("product_image"), ProductController.AddProduct)

// Get all Food products ---
router.get("/products/food/list",ProductController.GetFoodProducts)

// Delete Product data ---
router.delete("/product/delete", ProductController.DeleteProduct)


module.exports = router