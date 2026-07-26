const express = require ("express");
const userAuthorization = require("../middleware/auth.middleware");
const followController = require("../controllers/follow.controller.js");
const followRouter = express.Router();


followRouter.post('/follow/:userName',userAuthorization, followController.followingController)
followRouter.post('/unfollow/:userName',userAuthorization, followController.unfollowingController)

module.exports = followRouter;