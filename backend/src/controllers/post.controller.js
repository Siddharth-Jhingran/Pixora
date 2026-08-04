const postModel = require("../models/postModel.js");
const userModel = require("../models/userModel.js");
const imageKit = require("@imagekit/nodejs");
const {toFile} = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likesModel = require("../models/likeModel.js");

const imagekit = new imageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

async function createPostController(req, res){
    console.log(req.body, req.file);

    const file = await imagekit.files.upload({
        file: await toFile (Buffer.from(req.file.buffer),'file'),
        fileName: req.file.originalname,
        folder: "pixora"
    });
    res.status(200).json({message: "Post created successfully", data: file});

    
   
    
    const post = await postModel.create({
        caption: req.body.caption,
        imgURL: file.url,
        imgThumbnailURL: file.thumbnailUrl,
        userId: req.user.userId
    })
    res.status(201).json({message: "Post created successfully", data: post});
}

async function getAllPostsController(req, res){
   
    const userId= req.user.userId;
    const posts =await postModel.find({
        userId: userId
    })
    res.status(200).json({message: "Posts retrieved successfully", data: posts});
}

async function getPostDetailsController(req, res){
    
    const userId= req.user.userId;

    const postId = req.params.postId;
    const post = await postModel.findById(postId);
    if(!post){
        return res.status(404).json({message: "Post not found"});
    }
    const isValidUser = post.userId.toString() === userId
    if(!isValidUser){
        return res.status(403).json({message:"Forbidden Content"})
    }
    return res.json({
        message: "Post fetched successfully",
        post
    })
    
}

async function likeThePostController(req, res){
    const post= req.params.postId;
    const user= req.user.userName

    const isPostExist = await postModel.findById(post)
    if(!isPostExist){
        return res.status(404).json({message:"The post doesn't exist."})
    }
      const isLiked= await likesModel.findOne({
        post:post,
        user:user
    })
    if(isLiked){
        return res.status(409).json({message: "You already liked this post."})
    }

    const likeThePost = await likesModel.create({
        post:post,
        user:user
    })
    res.status(201).json({message: "You liked this post"})
}

async function dislikeThePostController(req, res){
    post= req.params.postId
    user= req.user.userName

    const isPostExist= await postModel.findById(post)
    if(!isPostExist){
        return res.status(404).json({message: "Post not found."})
    }
    const isLiked= await likesModel.findOne({
        post:post,
        user:user
    })
    if(!isLiked){
        return res.status(404).json({message: "You didn't like this post."})
    }

    const dislike= await likesModel.findOneAndDelete({
        post:post,
        user:user
    })
    res.status(201).json({message:"You disliked the post."})
}

async function getfeedController(req,res){
    const userName= req.user.userName;
    const feed = await Promise.all((await postModel.find().populate("userId").lean())
    .map(async post =>{

        const isLiked= await likesModel.findOne({
            post:post._id,
            user:userName
            
        })
        post.isLiked= isLiked

        return post



    }))
    res.status(200).json({
        message:"all feed fetched",
        feed
    
    })
}


module.exports = { createPostController, getAllPostsController, getPostDetailsController, likeThePostController, dislikeThePostController, getfeedController };
