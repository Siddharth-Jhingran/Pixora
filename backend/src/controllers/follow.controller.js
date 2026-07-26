const followModel = require("../models/followModel");
const userModel = require("../models/userModel");


async function followingController(req,res){
    const follower = req.user.userName;
    const followee = req.params.userName;
    
    const isFolloweeExist = await userModel.findOne({
        userName:followee
    })
    if(!isFolloweeExist){
        return res.status(404).json({message: "The account you want to follow doesn't exist"})
    }

    if(follower === followee){
        return res.status(400).json({message: "You can't follow yourself..."})
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower:follower,
        followee:followee
    })
    if(isAlreadyFollowing){
        return res.status(409).json({message: "User already following this account"})
    } 

    const follows = await followModel.create ({
        follower:follower,
        followee:followee
    })
    res.status(201).json({message: "You are following this account"})
}

async function unfollowingController(req, res){
    follower = req.user.userName
    followee = req.params.userName

    const isFolloweeExist= await userModel.findOne({
        userName:followee
    })
    if(!isFolloweeExist){
        return res.status(404).json({message:"The user you want to unfollow does not exist."})
    }
    const unfollow= await followModel.findOneAndDelete({
        follower: follower,
        followee: followee
    })
    res.status(201).json({message: "You unfollowed this account"})
}





module.exports = {followingController,unfollowingController};