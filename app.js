const express = require("express");
const app = express();
const path = require("path")
const cookieParser = require("cookie-parser");
const cors = require("cors")
require("dotenv").config();
require("./db").connectDB(); // Database connection

// Importing Routers ---
const UserRouter = require("./routes/userRoute")
const OtpRouter = require("./routes/OtpRoute")
const SubscribeRouter = require("./routes/SubscribeRoute")
const FoodRouter = require("./routes/FoodRoute")
const RestaurantRoute = require("./routes/RestaurantRoute")

// CORS origin config ---
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// app use ---
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"uploads")))

// Using routers ----
app.use(UserRouter)
app.use(OtpRouter)
app.use(SubscribeRouter)
app.use(FoodRouter)
app.use(RestaurantRoute)




PORT = process.env.PORT || 9002;

app.listen(PORT, () => {
  console.log("Server running on ", PORT);
});
