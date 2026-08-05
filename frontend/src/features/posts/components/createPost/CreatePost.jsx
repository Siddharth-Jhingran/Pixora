import React, { useRef, useState } from "react";
import "./createPost.scss";
import { RiAddLargeLine } from "@remixicon/react";
import { usePost } from "../../Hooks/usePost";
import { useNavigate } from "react-router";
import { PixoraSkeleton } from "../../../Skeleton/PixoraSkeleton";


export const CreateThePost = () => {
  const { handleCreatePost, loading, handleGetFeed } = usePost();
  const [imageURL, setImageURL] = useState(null);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  // Handle file selection
  const handleImageChange = (e) => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageURL(previewUrl);
    }
  };
  if(loading){
    // return(<main><h2>Loading...</h2></main>)
    return <PixoraSkeleton />
  }

  // Handle form submission
  const handleSubmit =async (e) => {
    event.preventDefault(); // Prevents page reload on form submit
    await handleCreatePost(fileInputRef.current.files[0], caption);
    navigate("/"); // Redirect to the feed page after post creation
    // Send your form data to API/backend here...
    await handleGetFeed() // Refresh the feed after creating a post
  };

  // Handle form reset
  const handleReset = () => {
    setImageURL(null); // Clears the image preview when form is reset
    setCaption(""); // Clears the caption when form is reset
  };

  return (
    <main className="createPostPage">
      <div className="createPostBlock">
        <h3>Create Your Post</h3>

        <form
          action=""
          className="createPostForm"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <input
            ref={fileInputRef}
            hidden
            type="file"
            accept="image/*"
            id="uploadPhoto"
            name="uploadPhoto"
            onChange={handleImageChange}
          />
          <div className="displayIMG">
            {imageURL && <img id="image"  src={imageURL} alt="Preview" />}
          </div>
          <label hidden={!!imageURL} htmlFor="uploadPhoto"><div id="uploadIcon"><RiAddLargeLine /></div></label>
          <br />
          <input
            id="caption"
            type="text"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button type="submit">Create Post</button>
          <button type="reset">Reset</button>
        </form>
      </div>
    </main>
  );
};
