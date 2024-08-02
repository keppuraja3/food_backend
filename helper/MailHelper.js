const nodemailer = require("nodemailer");
// require('dotenv').config()
const { Register } = require("./htmlTemplates/RegisterTemplate");
const { ConfirmOtp } = require("./htmlTemplates/ConfirmOtpTemplate");
const { Subscribe } = require("../helper/htmlTemplates/Subscribe");

exports.mailSender = async (mailData = {}) => {
  const { to, subject, name, otp } = mailData;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.smtpSendEamil,
        pass: process.env.smtpAppPass,
    },
    tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
    },
});

  // selecting html template--- 
  let htmlTemplate = null;

  if (otp && name) {
    htmlTemplate = ConfirmOtp(name, otp);
  } else if (name) {
    htmlTemplate = Register(name);
  } else {
    htmlTemplate = Subscribe();
  }

  // mail options---

  let mailOptions = {
    from: process.env.smtpSendEamil,
    to: to,
    subject: subject,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error on sending mail: ", error);
      return false;
    }

    console.log("Message send: ", info.messageId);
    console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
  });
};
