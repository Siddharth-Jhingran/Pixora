const mongoose= require("mongoose")

const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Posts",
        required:[true,'Post is necessary to like']
    },
    user:{
        type:String,
        required:[true,'User is required to like the post']
    }
},{timestamps:true})

likeSchema.index({post:1, user:1},{unique:true});

const likesModel = new mongoose.model('likes', likeSchema);

module.exports = likesModel;