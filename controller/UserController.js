const User = require("../models/UserModel");
const UserOtp = require("../models/OtpModel");
const { mailSender } = require("../helper/MailHelper");
const Product = require("../models/ProductModel");
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
      console.log("Adding user Error: ", error.message)
      return res
        .status(500)
        .json({ status: false, message: "Error on server" });
    }
  },
];

// Sign In with OTP [ "/auth/signin" ]
exports.SignInWithOtp = [
  async (req, res) => {
    const { email, mobileNo, otp } = req.body;
    const isOtpUser = await UserOtp.findOne({
      $or: [{ email }, { mobileNo }],
    });

    if (isOtpUser) {
      const user = await User.findOne({ $or: [{ email }, { mobileNo }] });
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
        return res
          .status(200)
          .json({ status: true, message: "Login successfully", token: token });
      } else {
        return res.status(409).json({ status: false, message: "Invalid OTP" });
      }
    } else {
      console.log("Login User Otp not found");
      return res
        .status(500)
        .json({ status: false, message: "Login UserOtp not found" });
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
      const product = await Product.findById(productId);

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
