const express = require("express")
const router = express.Router()
const UserController = require("../controller/UserController")
const OtpController = require("../controller/OtpController")

//Generate Sign Up OTP ---
router.post("/signup/otp", OtpController.SignUpOtpGenerate)

// Sign up with otp verification ---
router.post("/auth/signup", UserController.SignUpWithOtp)

// Generate Sign In OTP ---
router.post("/signin/otp",OtpController.SignInOtpGenerate)

// Sign In with OTP verification ---
router.post("/auth/signin", UserController.SignInWithOtp)

module.exports = router