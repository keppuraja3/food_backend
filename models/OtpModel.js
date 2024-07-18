const mongoose = require("mongoose")

const UserOtp = mongoose.model(
    "userOtp",
    new mongoose.Schema({
        email: {type: String, required: true, unique: true},
        mobileNo: {type: Number, required: true, unique: true},
        otp: {type: Number, required: true, min: 4}
    })
)

module.exports = UserOtp