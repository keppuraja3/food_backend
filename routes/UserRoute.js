const express = require("express")
const router = express.Router()
const UserController = require("../controller/UserController")
const OtpController = require("../controller/OtpController")

// User registration ---
router.post("/auth/register/verify", UserController.SignUpWithOtp)
router.post("/signup/otp", OtpController.SignUpOtpGenerate)

module.exports = router