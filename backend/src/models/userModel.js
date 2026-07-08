const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: [true, "Username is required"],
        unique:[true , "User already exists"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique:[true , "Email already exists"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    bio:String,
    profilePic:{
        type: String,
        default: "https://ik.imagekit.io/wbbydpgjl/images.jpg"
    },
    coverPic:{
        type: String
    }
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;