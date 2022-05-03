const mongoose = require("mongoose");

//model setup
const productSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        //required: true, 
        minlength: 3, 
        maxlength: 300 
    },
    price: { 
        type: Number, 
        //required: true, 
        get: getPrice, set: setPrice,
    },
    has_cancelled_price: { 
        type: Boolean, 
        default: true 
    },
    cancelled_price: {
      type: Number,
      get: getCancelledPrice, set: setCancelledPrice,
    },

    image: {
        type: String,
        required: true,
      },

    description: { 
        type: String, 
        //required: true, 
        minlength: 3, 
        maxlength: 1024 
    },

    category: { 
        type: String, 
        //required: true, 
        minlength: 3, 
        maxlength: 1024 
    },

    tags: { 
        type: String, 
        //required: true, 
        minlength: 3, 
        maxlength: 1024 
    },
    
  },
  { timestamps: true }
);

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

function getCancelledPrice(num){
    return (num/100).toFixed(2);
}

function setCancelledPrice(num){
    return num*100;
}

//const Product = mongoose.model("Product", productSchema);

// exports.Product = Product;
module.exports = mongoose.model('Product', productSchema);
// const _Product = Product;
// export { _Product as Product };
