const express = require("express");
const authrouter = express.Router();
const userModel = require("../models/userModel.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/auth.controller.js");

authrouter.post("/register", authController.registerController);


authrouter.post("/login", authController.loginController);

module.exports = authrouter;