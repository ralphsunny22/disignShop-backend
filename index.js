const express = require("express");
const cors = require("cors");

//making our appln an object
const app = express()

//express.json() is nw a middleware fxn, which helps to expand our application
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to disign backend")
});

const port = process.env.PORT || 5000

app.listen(port, console.log(`Server running on port ${port}`))
