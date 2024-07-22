const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
require("dotenv").config();
require("./db").connectDB(); // Database connection
const mainRouter = require("./routes/mainRoute")


// app use ---
app.use(express.json())
app.use(cookieParser())
app.use(mainRouter)

PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on ", PORT);
});
