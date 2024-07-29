const express = require("express")
const router = express.Router()

const FoodController = require("../controller/FoodController")
const multerhelper = require("../helper/Cloudinary");

// Add food data with image ---
router.post("/food/add",multerhelper.multerupload.single("food_image"), FoodController.AddFood)

// Get all Food list ---
router.get("/food/list",FoodController.GetFoodList)

// Update food data with image ---
router.put("/food/update/:foodId",multerhelper.multerupload.single("food_image"), FoodController.UpdateFood)

// Delete food data ---
router.delete("/food/delete/:foodId", FoodController.DeleteFood)

module.exports = router