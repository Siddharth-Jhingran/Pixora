const express = require("express");
const authrouter = express.Router();
const userModel = require("../models/userModel.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/auth.controller.js");
const userAuthorization = require("../middleware/auth.middleware.js");

authrouter.post("/register", authController.registerController);
authrouter.post("/login", authController.loginController);
authrouter.get('/get-me',userAuthorization, authController.getmeController)

module.exports = authrouter;