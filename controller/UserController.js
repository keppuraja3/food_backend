const User = require("../models/UserModel");

const {mailSender} = require("../helper/MailHelper")

exports.addUser = [
  async (req, res) => {
   try {
    const { name, email, mobileNo } = req.body;
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

    const newUser = new User({
      name,
      email,
      mobileNo,
    });

    await newUser.save();

    await mailSender({to: email, name: name, subject: "Food Project Team"})
    return res.status(200).json({status: true, message: "User registered successfully"})

   } catch (error) {
    console.log("Adding user Error: ", error)
   }
  },
];
