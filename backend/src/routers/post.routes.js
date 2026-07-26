const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller.js");
const multer = require("multer");
const userAuthorization = require("../middleware/auth.middleware.js");
const upload = multer({storage: multer.memoryStorage()});

postRouter.post("/create", upload.single("imgURL"),userAuthorization, postController.createPostController);
postRouter.get("/all",userAuthorization, postController.getAllPostsController);
postRouter.get("/details/:postId",userAuthorization, postController.getPostDetailsController);
postRouter.post("/like/:postId",userAuthorization,postController.likeThePostController)
postRouter.post("/dislike/:postId",userAuthorization,postController.dislikeThePostController)
module.exports = postRouter;