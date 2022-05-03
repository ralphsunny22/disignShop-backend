const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const registerRouter = require("./routes/register");
const bodyParser = require("body-parser");
const addProductRouter = require("./routes/postProduct");
const path = require("path");
const router = require("./routes/routes");
const session = require("express-session");
const cookieParser = require("cookie-parser")
const flash =  require("connect-flash")

//making our appln an object
const app = express()

dotenv.config()

//express.json() //is nw a middleware fxn, which helps to expand our application
//app.use(json) //so that we can receive json data
//app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
express.json()
app.use(cors())

// set template engine
// app.set('views', './views')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser("SecretKeyForCookies"));

app.use(
    session({
        secret: "SecretKeyForSession",
        cookie: { maxAge: 6000 },
        resave: true,
        saveUninitialized: true, 
    })
);
app.use(flash());

// app.use((req, res, next) => {
//     res.locals.message = req.session.message;
//     delete req.session.message;
//     next();
// })

//allow public assets files
app.use(express.static(__dirname + '/public'));



//point to register router
app.use("/api/register", registerRouter)
// app.use("/api/add-product", addProductRouter)
app.use("", router);



//launch test appln
// app.get("/", (req, res) => {
//     res.send("Welcome to disign backend")
// });

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
