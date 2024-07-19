const nodemailer = require("nodemailer")
// require('dotenv').config()
const { Register }= require("./htmlTemplates/RegisterTemplate")
const { ConfirmOtp } = require("./htmlTemplates/ConfirmOtpTemplate")

exports.mailSender = async (mailData= {})=>{

    const {to,subject,name,otp}= mailData
    const transpoter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.smtpSendEamil,
            pass: process.env.smtpAppPass
        }
    })  

    // selecting html template---
    let htmlTemplate = null

    if(mailData.otp){
        htmlTemplate=  ConfirmOtp(name,otp)
    }else{
        htmlTemplate = Register(name)
    }

    // mail options---

    let mailOptions = {
        from: process.env.smtpSendEamil,
        to: to,
        subject: subject,
        html: htmlTemplate,
    }

    await transpoter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log("Error on sending mail: ",error)
    }

    console.log("Message send: ",info.messageId)
    console.log("Preview URL: ",nodemailer.getTestMessageUrl(info));
    })


}