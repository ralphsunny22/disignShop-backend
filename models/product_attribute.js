import mongoose from "mongoose";

//model setup
const productAttributeSchema = new mongoose.Schema(
  {
    product_id: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Product', 
        required: true, 
    },
    sku: { 
        type: String,
        required: true,  
        unique: true,
        minlength: 1, 
        maxlength: 1024
    },
    quantity: { 
        type: Number,
        required: true,  
        minlength: 1, 
        maxlength: 1024
    },
    color: { 
        type: String, 
        minlength: 1, 
        maxlength: 1024
    },
    size: { 
        type: String, 
        minlength: 1, 
        maxlength: 1024 
    },
    
  },
  { timestamps: true }
);


const ProductAttribute = mongoose.model("ProductAttribute", productAttributeSchema);

const _ProductAttribute = ProductAttribute;
export { _ProductAttribute as ProductAttribute };
