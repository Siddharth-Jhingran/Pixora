const postModel = require("../models/postModel.js");
const userModel = require("../models/userModel.js");

async function createpostController(req, res){
    console.log(req.body, req.file);
}

module.exports = { createpostController };