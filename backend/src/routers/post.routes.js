const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller.js");
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});

router.post("/create", upload.single("imgURL"), postController.createpostController);
module.exports = router;