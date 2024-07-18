const express = require("express")
const router = express.Router()
const UserController = require("../controller/UserController")

// User registration ---
router.post("/user/register", UserController.addUser)

module.exports = router