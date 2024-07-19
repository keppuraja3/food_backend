const otpGenerator = require("otp-generator");

exports.GenerateOtp = async (digit) => {
  const otp = await otpGenerator.generate(digit, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return otp
};
