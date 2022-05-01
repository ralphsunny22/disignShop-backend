import { genSalt, hash } from "bcrypt";
import Joi from "joi";
import { Router } from "express";
import { User } from "../models/user.js";
import genAuthToken from "../utils/genAuthToken.js";

const registerRouter = Router();

//like controllers
registerRouter.post("/", async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(30).required().email(),
        password: Joi.string().min(6).max(30).required(),
    });

const {error} = schema.validate(req.body)

if(error) return res.status(400).send(error.details[0].message);
//else

//check if email already exists
let user = await User.findOne({email: req.body.email});
if(user) return res.status(400).send("User already exists");

//create new user as document to db
user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
})

//hash password
const salt = await genSalt(10)
user.password = await hash(user.password, salt)

//saved to db
user = await user.save();

const token = genAuthToken(user);

res.send(token);
});

// module.exports = registerRouter;
export default registerRouter;



