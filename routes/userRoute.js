const express = require("express")
const router = express.Router()

const UserController = require("../controller/UserController")


// Sign up with otp verification ---
router.post("/auth/signup", UserController.SignUpWithOtp)

// Sign In with OTP verification ---
router.post("/auth/signin", UserController.SignInWithOtp)

// Add feedback product to the user list ---
router.post('/users/:userId/feedback/:productId', UserController.AddFeedback)

module.exports = router