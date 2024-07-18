const nodemailer = require("nodemailer")
require('dotenv').config()
const {Register}= require("./RegisterTemplete")

exports.mailSender = async (mailData= {})=>{

    const {to,subject,name}= mailData
    const transpoter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.smtpSendEamil,
            pass:process.env.smtpAppPass
        }
    })   

    // mail options---

    let mailOptions = {
        from: process.env.smtpSendEamil,
        to: to,
        subject: subject,
        html:Register(name),
    }

    await transpoter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log("Error on sending mail: ",error)
    }

    console.log("Message send: ",info.messageId)
    console.log("Preview URL: ",nodemailer.getTestMessageUrl(info));
    })


}