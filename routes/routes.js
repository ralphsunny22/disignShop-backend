const express = require("express");
const Joi = require("joi");
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const Swal = require('sweetalert2');
const { User } = require("../models/user");
const fs = require('fs')

//create router
let router = express.Router();
//store product img
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
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
            res.redirect("/all-product");
        }
    })
})

router.get("/", (req, res) => {
    res.render('landing', { title: 'Admin Dashboard' })
})
router.get("/add-product", (req, res) => {
    res.render('addProduct', { title: 'Add Product' })
})
router.get("/all-product", (req, res) => {
    Product.find().exec((err, products) => {
        if(err){
            res.json({ message: err.message })
        } else {
            res.render('allProduct', { 
                title: 'All Product',
                products: products,
                addPostFlash: req.flash('add_post_flash'), 
            })
        }
    })
})

// Edit single product
router.get('/edit-product/:id', (req, res) => {
    let id = req.params.id;
    Product.findById(id, (err, product) => {
        if(err){
            res.redirect('/');
        } else {
            if(product == null){
                res.redirect('/');
            } else {
                res.render('editProduct', {
                    title: "Edit Product",
                    product: product,
                })
            }
        }
    })
})

// update product route
router.post('/update-product/:id', upload, (req, res) => {
    let id = req.params.id;
    let new_image = '';

    if(req.file){
        new_image = req.file.filename
        try{
            fs.unlinkSync('./public/uploads/'+req.body.old_image);
        } catch (err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }

    Product.findByIdAndUpdate(id, {
        title: req.body.title,
        price: req.body.price,
        cancelled_price: req.body.cancelled_price,
        image: new_image,
        description: req.body.description,
        category: req.body.category,
        tags: req.body.tags,
    }, (err, result) => {
        if(err){
            res.json({ message: err.message, type: 'danger' })
        } else {
            req.flash('add_post_flash', 'Post Updated Successfully!')
            res.redirect("/all-product");
        }
    })

});

//delete product
router.get('/delete-product/:id', (req, res) => {
    let id = req.params.id;
    Product.findByIdAndRemove(id, (err, product) => {
        if (product.image != '') {
            try {
                fs.unlinkSync('./public/uploads/'+product.image);
            } catch (err) {
                console.log(err)
            } 
        }
        
        if (err) {
            res.json({ message: err.message, type: 'info' });
        } else {
            req.flash('add_post_flash', 'Post Deleted Successfully!')
            res.redirect("/all-product");
        }
    })
})
module.exports = router;
// export default router;