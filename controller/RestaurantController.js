const Restaurant = require("../models/RestaurantModel");

// Add new restaurant ["/restaurant/add"]---
exports.addRestaurant = [
  async (req, res) => {
    try {
      const { hub_name, email, mobile_no, address } = req.body;

      isExist = await HubCompany.findOne({ email });
      if (isExist)
        return res
          .status(409)
          .json({ status: false, message: "Credentials already exits" });

      await HubCompany.create({
        hub_name,
        email,
        mobile_no,
        address:{
            street:address.street,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
        }
      });
      return res
        .status(201)
        .json({ status: true, message: "Hub Company Added" });
    } catch (error) {
      console.log("Error on add hub company: ", error);
      return res
        .status(500)
        .json({ status: false, message: "Error on server" });
    }
  },
];
