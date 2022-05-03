const express = require("express");
const Joi = require("joi");
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const Swal = require('sweetalert2');

//create router
let router = express.Router();
//store product img
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        //cb(null, Date.now()+path.extname(file.originalname)); //123456.png
        cb(null, file.fieldname +"_"+ Date.now() +"_"+ file.originalname);
    }
})

const upload = multer({
    storage: Storage,
}).single("image");

router.post("/add-product", upload, (req, res) => {
    
    const newProduct = new Product({
        title: req.body.title,
        price: req.body.price,
        cancelled_price: req.body.cancelled_price,
        image: req.file.filename,
        description: req.body.description,
        category: req.body.category,
        tags: req.body.tags,
    })

    //res.send(newProduct)
    newProduct.save((err) => {
        if(err){
            res.json({message: err.message, type:'danger'})
        } else {
            req.flash('add_post_flash', 'Post added successfully')
            res.redirect("/add-product");
        }
    })
})

router.get("/", (req, res) => {
    res.render('landing', { title: 'Admin Dashboard' })
})
router.get("/add-product", (req, res) => {
    res.render('addProduct', { title: 'Add Product', addPostFlash: req.flash('add_post_flash') })
})

module.exports = router;
// export default router;