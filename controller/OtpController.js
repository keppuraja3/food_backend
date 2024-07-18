const UserOtp = require("../models/OtpModel");
const otpGenerator = require("otp-generator")
const {mailSender} = require("../helper/MailHelper")

// otp generate for sign up ---
exports.SignUpOtpGenerate = [
  async (req, res) => {
    try {
      const { email, mobileNo } = req.body;

      // Checking user is already registered or not using email id
      const isEmail = await UserOtp.findOne({ email });
      if (isEmail) {
        return res
          .status(409)
          .json({ status: false, message: "Email already registered" });
      }

      // Checking user is already registered or not using Mobile No
      const isMobileNo = await UserOtp.findOne({ mobileNo });
      if (isMobileNo) {
        return res
          .status(409)
          .json({ status: false, message: "Mobile No already registered" });
      }

      const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false})

      const newUserOtp = new UserOtp({
        email,mobileNo,otp
      })
      await mailSender({to: email, subject: "Confirm Otp", otp})

      // console.log("otp--- ",otp)
      await newUserOtp.save()

      return res.status(200).json({status: true, message: "Otp generated"})

    } catch (error) {
        console.log("SignUp Otp Error: ", error)
        return res.status(500).json({status: false, message: "Error on server"})
    }
  },
];
