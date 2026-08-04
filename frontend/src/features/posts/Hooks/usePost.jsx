import { createPost, dislikeThePost, getfeed, likeThePost } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

import React from 'react'

export const usePost = () => {
  
    const context = useContext(PostContext)
    
    const {post, setPost, feed, setFeed, loading, setLoading} = context
    async function handleGetFeed(){
        setLoading(true)
        try{
            const response = await getfeed()
            setFeed(response.feed.reverse())
           
        }
        catch(err){
            throw err
        }
        finally{setLoading(false)}
    }

    async function handleCreatePost(imageURL, caption){
        setLoading(true)
        try{
            const response = await createPost(imageURL, caption)
            setFeed([response.data, ...feed])
        }
        catch(err){
            throw err
        }
        finally{setLoading(false)}
    }

    async function handleLikePost(postId){
        const response = await likeThePost(postId)
        setFeed(feed.map((post) => (post._id === postId ? response.data : post)))
    }

    async function handleDislikePost(postId){
        const response = await dislikeThePost(postId)
        setFeed(feed.map((post) => (post._id === postId ? response.data : post)))
    }

    return { post, feed, loading, handleGetFeed, handleCreatePost, handleLikePost, handleDislikePost }


}