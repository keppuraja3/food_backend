const nodemailer = require("nodemailer")
require('dotenv').config()
exports.mailSender = async (mailData= {})=>{

    const {to,subject}= mailData
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
        html:"<h1>Welcome to food</h1>",
    }

    await transpoter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log("Error on sending mail: ",error)
    }
    
    console.log("Message send: ",info.messageId)
    console.log("Preview URL: ",nodemailer.getTestMessageUrl(info));
    })


}