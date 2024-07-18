const User = require("../models/UserModel");
const UserOtp = require("../models/OtpModel");
const { mailSender } = require("../helper/MailHelper");

// Sign up with otp [ "/auth/register/verify" ] ---
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
            .json({ status: false, message: "invalid otp" });
        }
      }
    } catch (error) {
      console.log("Adding user Error: ", error);
      return res
        .status(500)
        .json({ status: false, message: "Error on server" });
    }
  },
];

exports.UserLogin = [
  async (req, res) => {
    // const
  },
];
