const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: ""
    },
    imgURL: {
        type: String,
        required: true
    },
    imgThumbnailURL: {
        type: String,
        default: ""
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required to create a post"]
    }
})

const postModel = mongoose.model("Posts", postSchema);
module.exports = postModel;