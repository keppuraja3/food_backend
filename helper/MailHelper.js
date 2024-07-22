const nodemailer = require("nodemailer")
// require('dotenv').config()
const { Register }= require("./htmlTemplates/RegisterTemplate")
const { ConfirmOtp } = require("./htmlTemplates/ConfirmOtpTemplate")
const { Subscribe } = require("../helper/htmlTemplates/Subscribe")

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

    if(otp && name){
        htmlTemplate=  ConfirmOtp(name,otp)
    }
    else if(name){
        htmlTemplate = Register(name)
    }
    else{
        htmlTemplate = Subscribe()
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