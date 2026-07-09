
const userModel = require("../models/userModel.js");
// const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
    const {userName, email, password, bio, profilePic, coverPic} = req.body;
    const isUserExist = await userModel.findOne({
        $or: [
            {userName:userName},
            {email:email}
        ]
    })
    if(isUserExist){
        return res.status(409).json({message: "User already exists " + (isUserExist.userName === userName
            ? "by Username"
            : "by Email"
        )})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // res.status(201).json({message: "User created successfully", user: newUser})

    const newUser = await userModel.create({
        userName,
        email,
        bio,
        profilePic,
        coverPic,
        password: hashedPassword
    })
    const token = jwt.sign(
        {userId: newUser._id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )
    res.cookie("token", token);
    res.status(201).json({
        message: "User created and logged in successfully",
        user: newUser.userName,
        email: newUser.email,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
        coverPic: newUser.coverPic,
        
        }); 
}

const loginController = async (req, res) => {
    const {userName, email, password} = req.body;
    const existingUser = await userModel.findOne({
        $or:[
            {userName:userName},
            {email:email}   
        ]
    })
    if(!existingUser){
        return res.status(404).json({message: "User not found"})
    }
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch){
        return res.status(401).json({message: "Invalid credentials"})
    }
    const token = jwt.sign(
        {userId: existingUser._id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )
    res.cookie("token", token);
    res.status(200).json({
        message: "User logged in successfully",
        user: existingUser.userName,
        email: existingUser.email,
        bio: existingUser.bio,
        profilePic: existingUser.profilePic,
        coverPic: existingUser.coverPic,
        token
    });

}

module.exports =  authController = {
    registerController,
    loginController
};