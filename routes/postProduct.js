const express = require("express");
const Joi = require("joi");
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");

const addProductRouter = express.Router();


//like controllers. req validations
addProductRouter.post("/", async (req, res) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required(),
        price: Joi.number().required(),
        cancelled_price: Joi.number(),
        description: Joi.string(),
        // image: Joi.string(),
        category: Joi.string(),
        tags: Joi.string(),
    });

const {error} = schema.validate(req.body)

if(error) return res.status(400).send(error.details[0].message);

let user = await User.findOne({email: req.body.email});
if(user) return res.status(400).send("User already exists");

//create new user as document to db
let product = new Product({
    title: req.body.title,
    price: req.body.price,
    cancelled_price: req.body.cancelled_price,
    // image: req.file.filename,
    description: req.body.description,
    category: req.body.category,
    tags: req.body.tags,
})

//saved to db
product = await product.save();

res.send(product);
});

module.exports = addProductRouter;
// export default addProductRouter;