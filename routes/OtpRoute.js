const express = require("express");
const router = express.Router();
const OtpController = require("../controller/OtpController");

//Generate Sign Up OTP ---
router.post("/signup/otp", OtpController.SignUpOtpGenerate);

// Generate Sign In OTP ---
router.post("/signin/otp", OtpController.SignInOtpGenerate);

// Resend OTP ---
router.post("/resend/otp/:id", OtpController.ResendOtp);

module.exports = router;
