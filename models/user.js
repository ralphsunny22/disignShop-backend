const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 30
    },
    email: {
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 30, 
        unique: true
    },
    password: {
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 100, 
    },
    isAdmin: { type: Boolean, default: false },
},
{ timestamps: true }

);

//User becomes users in db
const User = mongoose.model("User", userSchema);

exports.User = User;

