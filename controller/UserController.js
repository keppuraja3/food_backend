const User = require("../models/UserModel");
const UserOtp = require("../models/OtpModel");
const { mailSender } = require("../helper/MailHelper");
const Food = require("../models/FoodModel");
const jwt = require("jsonwebtoken");

// Sign up with OTP [ "/auth/signup" ] ---
exports.SignUpWithOtp = [
  async (req, res) => {
    try {
      const { otpId, otp } = req.body;

      // Checking userotp data ---
      const OtpUser = await UserOtp.findById(otpId);

      if (OtpUser) {
        // console.log(isOtpUser);
        if (OtpUser.otp === otp) {
          const newUser = new User({
            name: OtpUser.name,
            email: OtpUser.email,
            mobileNo: OtpUser.mobileNo,
            otpId,
          });

          await newUser.save();

          await mailSender({
            to: OtpUser.email,
            name: OtpUser.name,
            subject: "Registration completed",
          });
          return res
            .status(201)
            .json({ status: true, message: "User registered successfully" });
        } else {
          return res
            .status(409)
            .json({ status: false, message: "invalid OTP" });
        }
      } else {
        console.log("Register UserOtp not found");
        return res
          .status(409)
          .json({ status: false, message: "Register User Otp not found" });
      }
    } catch (error) {
      console.log("Adding user Error: ", error.message);
      return res.status(500).json({ status: false, message: error.message });
    }
  },
];

// Sign In with OTP [ "/auth/signin" ]
exports.SignInWithOtp = [
  async (req, res) => {
    try {
      const { otpId, otp } = req.body;
      const isOtpUser = await UserOtp.findById(otpId);

      if (isOtpUser) {
        const user = await User.findOne({ otpId });
        if (isOtpUser.otp === otp) {
          const token = await jwt.sign(
            {
              id: user._id,
              name: user.name,
              email: user.email,
              mobileNo: user.mobileNo,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            status: true,
            message: "Login successfully",
            token: token,
          });
        } else {
          return res
            .status(409)
            .json({ status: false, message: "Invalid OTP" });
        }
      } else {
        console.log("Login User Otp not found");
        return res
          .status(500)
          .json({ status: false, message: "Login UserOtp not found" });
      }
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
];

// Add to favorite [""] ---
exports.AddFavorite = [
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;

      const user = await User.findById(userId);

      if (!user.favorites.includes(productId)) {
        user.favorites.push(productId);
        await user.save();
        return res
          .status(201)
          .json({ status: true, message: "Item added to favorites" });
      } else {
        return res
          .status(400)
          .json({ status: false, message: "Item already in favorites" });
      }
    } catch (error) {
      console.log("Error on add favorite: ", error);
      return res.status(500).json({ status: false, message: error.message });
    }
  },
];

// Remove from favorite [""] ---
exports.RemoveFavorite = [
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;

      const user = await User.findById(userId);
      user.favorites = user.favorites.filter(
        (fav) => fav.toString() !== productId
      );
      await user.save();
      return res
        .status(200)
        .json({ stauts: true, message: "Item removed from favorites" });
    } catch (error) {
      console.log("Error on remove fav: ", error);
      return res.status(500).json({ status: false, message: error.message });
    }
  },
];

// Adding feedback [ '/user/:userId/product/:productId' ]---
exports.AddFeedback = [
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;

      // Find the user and product, and add feedback
      const user = await User.findById(userId);
      const product = await Food.findById(productId);

      if (!user || !product) {
        return res
          .status(404)
          .json({ status: false, message: "User or product not found" });
      }

      // Add the product to the user's favorites if it's not already there
      if (!user.feedbacks.includes(productId)) {
        user.feedbacks.push(productId);
        await user.save();
      }
      return res
        .status(201)
        .json({ stauts: true, message: "Feedback submitted" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },
];
