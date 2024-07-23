const UserOtp = require("../models/OtpModel");
const {GenerateOtp} = require("../helper/GenerateOtp")
const { mailSender } = require("../helper/MailHelper");
const User = require("../models/UserModel")

// Generate OTP for sign up ["/signup/otp"]---
exports.SignUpOtpGenerate = [
  async (req, res) => {
    try {
      const { email, mobileNo, name } = req.body;

      // Checking user is already registered or not using email id
      const isEmail = await User.findOne({ email });
      if (isEmail) {
        return res
          .status(409)
          .json({ status: false, message: "Email already registered" });
      }

      // Checking user is already registered or not using Mobile No
      const isMobileNo = await User.findOne({ mobileNo });
      if (isMobileNo) {
        return res
          .status(409)
          .json({ status: false, message: "Mobile No already registered" });
      }

      const otp = await GenerateOtp(6)

      const newUserOtp = new UserOtp({
        name,
        email,
        mobileNo,
        otp: otp,
      });
      
      await mailSender({
        to: email,
        subject: "OTP Verification",
        otp: otp,
        name: name,
      });

      // console.log("otp--- ", otp);
      await newUserOtp.save();
      console.log("new user otp: ",newUserOtp);
      return res.status(201).json({ status: true, message: "Otp generated", otpId: newUserOtp._id});
    } catch (error) {
      console.log("SignUp Otp Error: ", error);
      return res
        .status(500)
        .json({ status: false, message: "Error on server" });
    }
  },
];

// Generate OTP for sign in
exports.SignInOtpGenerate = [
  async (req, res) => {
    try {
      const { email, mobileNo } = req.body;

      // Checking if the user is exist ---
      const IsUser = await User.findOne({$or:[{email},{mobileNo}]})

      if(!IsUser) return res.status(409).json({status: false, message: "User not found"})
      
      const otp = await GenerateOtp(6);

      await UserOtp.findOneAndUpdate({$or:[{email},{mobileNo}]},{otp: otp})

      await mailSender({
        to: email,
        name: IsUser.name,
        subject: "Sign UP Otp",
        otp: otp,
      });

      return res.status(200).json({status: true, message: "Login otp send successfully"})
    } catch (error) {

      console.log("Error on Sign In OTP: ", error)
      return res.status(500).json({status: false, message: "Error on Sign In"})

    }

  },
];
