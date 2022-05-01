import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import registerRouter from "./routes/register.js"; //exported as "router"
import bodyParser from "body-parser"



//making our appln an object
const app = express()

dotenv.config()

//express.json() is nw a middleware fxn, which helps to expand our application
//app.use(json) //so that we can receive json data
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//point to register router
app.use("/api/register", registerRouter)

//launch test appln
app.get("/", (req, res) => {
    res.send("Welcome to disign backend")
});

const port = process.env.PORT || 5000
const db_uri = process.env.DB_URI

app.listen(port, console.log(`Server running on port ${port}`))

//connecting to mongodb
mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
