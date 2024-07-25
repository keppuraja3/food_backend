const express = require("express")
const router = express.Router()

const HubCompanyController = require("../controller/RestaurantController")

router.post("/restaurant/add",HubCompanyController.addHubCompany)

module.exports = router