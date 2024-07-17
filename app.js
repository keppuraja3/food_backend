const express = require('express')
const app = express()
require("dotenv").config()
require('./db').connectDB() // Database connection

PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log("Server running on ",PORT)
})