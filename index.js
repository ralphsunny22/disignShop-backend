const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")


//making our appln an object
const app = express()

require("dotenv").config()

//express.json() is nw a middleware fxn, which helps to expand our application
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to disign backend")
});

const port = process.env.PORT || 5000
const db_uri = process.env.DB_URI

app.listen(port, console.log(`Server running on port ${port}`))

//connecting to mongodb
mongoose
  .connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
