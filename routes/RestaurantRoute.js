const express = require("express")
const router = express.Router()

const RestaurantController = require("../controller/RestaurantController")
const multerhelper = require("../helper/Cloudinary");

// Add food data with image ---
router.post("/restaurant/add",multerhelper.multerupload.single("restaurant_image"),RestaurantController.addRestaurant)

module.exports = router