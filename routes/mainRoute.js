const express = require("express")
const router = express.Router()
const UserController = require("../controller/UserController")
const OtpController = require("../controller/OtpController")
const SubscribeController = require("../controller/SubscribeController")
const ProductController = require("../controller/ProductController")
const multerhelper = require("../helper/Cloudinary");

//Generate Sign Up OTP ---
router.post("/signup/otp", OtpController.SignUpOtpGenerate)

// Sign up with otp verification ---
router.post("/auth/signup", UserController.SignUpWithOtp)

// Generate Sign In OTP ---
router.post("/signin/otp",OtpController.SignInOtpGenerate)

// Sign In with OTP verification ---
router.post("/auth/signin", UserController.SignInWithOtp)

// Add subscriber
router.post("/subscribe", SubscribeController.Subscribe)

// Add favorite product to the user list ---
router.post('/users/:userId/feedback/:productId', UserController.AddFeedback)

// Add Product data ---
router.post("/product/add",multerhelper.multerupload.single("product_image"), ProductController.AddProduct)

// Delete Product data ---
router.delete("/product/delete", ProductController.DeleteProduct)

module.exports = router