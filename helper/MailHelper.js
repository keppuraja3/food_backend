const nodemailer = require("nodemailer")

exports.mailSender = async (mailData= {})=>{

    const {to,subject}= mailData
    const transpoter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: "wwwrajakarthi3@gmail.com",
            pass:"qdui cspe tczh zwcu"
        }
    })   

    // mail options---

    let mailOptions = {
        from:"wwwrajakarthi3@gmail.com",
        to: "keppuraja3@gmail.com",
        subject: "Thank you for regitered",
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