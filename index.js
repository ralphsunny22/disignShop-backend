import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import register from "./routes/register"; //exported as "router"


//making our appln an object
const app = express()

require("dotenv").config()

//express.json() is nw a middleware fxn, which helps to expand our application
app.use(json) //so that we can receive json data
app.use(cors())

//point to reister router
app.use("/api/register", register)

app.get("/", (req, res) => {
    res.send("Welcome to disign backend")
});

const port = process.env.PORT || 5000
const db_uri = process.env.DB_URI

app.listen(port, console.log(`Server running on port ${port}`))

//connecting to mongodb
connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
