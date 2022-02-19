const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    name : { 
        type : String,
        required: true},
    
    email : { 
        type : String,
        required: true,
        unique : true},

    password : { 
        type : String,
        required: true}

})

// creating collection
const Register = new mongoose.model("Register", userSchema);
module.exports =   Register;