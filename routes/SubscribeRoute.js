const express = require("express")
const router = express.Router()

const SubscribeController = require("../controller/SubscribeController")

// Add subscriber ---
router.post("/subscribe", SubscribeController.Subscribe)

module.exports = router