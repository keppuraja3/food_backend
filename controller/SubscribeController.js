const Subscriber = require("../models/SubscribeModel");
const { mailSender } = require("../helper/MailHelper");

exports.Subscribe = [
  async (req, res) => {
    try {
      const { email } = req.body;

      // Checking this email is already exits ---
      const isSubscribe = await Subscriber.findOne({ email });

      if (isSubscribe)
        return res
          .status(409)
          .json({ status: false, message: "Email already subscribed" });

      const newSubscriber = new Subscriber({
        email,
      });

      await newSubscriber.save();

      // Get the name form email address ---
      function getNameFromEmail(email) {
        // This splits the string at the "@" symbol and returns the first part
        const namePart = email.split('@')[0];
        return namePart || "Client";
    }
    
    const name = await getNameFromEmail(email);

      await mailSender({ to: email, name, subject: "Thanks for the subscribe" });

      return res
        .status(201)
        .json({ status: true, message: "Subscribed successfully" });

    } catch (error) {
      console.log("Subscribe Error: ", error);
    }
  },
];
