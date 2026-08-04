import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/api/post/",
    withCredentials:true
})

export async function getfeed(){
    const response = await api.get("/getfeed")
    return(response.data)
}

export async function createPost(imageURL, caption){
    const formData = new FormData()

    formData.append("imgURL", imageURL)
    formData.append("caption", caption)
    const response = await api.post("/create",formData)
    return(response.data)
}

export async function likeThePost(postId){
    const response = await api.post(`/like/${postId}`)
    return response.data
}

export async function dislikeThePost(postId){
    const response = await api.post(`/dislike/${postId}`)
    return response.data
}