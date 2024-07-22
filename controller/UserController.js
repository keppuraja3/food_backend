const User = require("../models/UserModel");
const UserOtp = require("../models/OtpModel");
const { mailSender } = require("../helper/MailHelper");
const jwt = require("jsonwebtoken")

// Sign up with OTP [ "/auth/signup" ] ---
exports.SignUpWithOtp = [
  async (req, res) => {
    try {
      const { name, email, mobileNo, otp } = req.body;

      // Checking userotp data ---

      const isOtpUser = await UserOtp.findOne({
        $or: [{ email }, { mobileNo }],
      });

      if (isOtpUser) {
        // console.log(isOtpUser);
        if (isOtpUser.otp === otp) {
          const newUser = new User({
            name,
            email,
            mobileNo,
          });

          await newUser.save();

          await mailSender({
            to: email,
            name: name,
            subject: "Food Project Team",
          });
          return res
            .status(200)
            .json({ status: true, message: "User registered successfully" });
        } else {
          return res
            .status(409)
            .json({ status: false, message: "invalid OTP" });
        }
      }
      else{
        console.log("Register UserOtp not found")
        return res.status(500).json({status: false, message: "Register UserOtp not found"})
      }
    } catch (error) {
      console.log("Adding user Error: ", error.message);
      return res
        .status(500)
        .json({ status: false, message: "Error on server" });
    }
  },
];

// Sign In with OTP [ "/auth/signin" ]
exports.SignInWithOtp = [
  async (req, res) => {
    const { email, mobileNo, otp} = req.body
    const isOtpUser = await UserOtp.findOne({
      $or: [{ email }, { mobileNo }],
    });

    if(isOtpUser){
      const user = await User.findOne({$or:[{email},{mobileNo}]})
      if(isOtpUser.otp===otp){

        const token = await jwt.sign({
          id: user._id,
          name: user.name,
          email: user.email,
          mobileNo: user.mobileNo,
        },process.env.SECRET_KEY,{expiresIn: "1h"})
        return res.status(200).json({status: true, message: "Login successfully", token: token})

      }else{
        return res.status(409).json({status: false, message: "Invalid OTP"})
      }
    }
    else{
      console.log("Login User Otp not found")
      return res.status(500).json({status: false, message: "Login UserOtp not found"})
    }
  },
];
