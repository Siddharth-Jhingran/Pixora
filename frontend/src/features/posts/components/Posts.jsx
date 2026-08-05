import React from "react";
import { RiBookmarkLine, RiChat3Line, RiHeartFill, RiHeartLine, RiShareForwardLine } from "@remixicon/react";
import { usePost } from "../Hooks/usePost";

export const Posts = ({ user, post }) => {

  const {handleLikePost, handleDislikePost} = usePost()

  const displayName = user?.userName || "pixora_user";
  const initials = displayName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
  const likeCount = post?.likesCount ?? 0;
  const caption = post?.caption || "A fresh moment from the Pixora community.";

  return (
    <article className="posts">
      <div className="user">
        <div className="userInfo">
          <div className="profile">
            {user?.profilePic ? (
              <img src={user.profilePic} alt={displayName} className="profileIMG" />
            ) : (
              <div className="profileAvatar">{initials}</div>
            )}
          </div>
          <div className="username">
            <h4>{displayName}</h4>
            <p>Creating a brighter feed</p>
          </div>
        </div>
      </div>

      <img className="postIMG" src={post?.imgURL} alt={caption} />

      <div className="footer">
        <div className="postMeta">
          <span className="postBadge">✨ Featured</span>
          <span className="postedAt">2h ago</span>
        </div>
        <div className="buttons">
          <div className="likeNshare">
            <button type="button" onClick={() => {
              if(post.isLiked){
                handleDislikePost(post._id)
              } else {
                handleLikePost(post._id)
              }
            }}>
              {post?.isLiked ? (
                <RiHeartFill className="remix" color="rgba(255,0,0,1)" />
              ) : (
                <RiHeartLine className="remix" />
              )}
            </button>
            <RiChat3Line className="remix" />
            <RiShareForwardLine className="remix" />
          </div>
          <RiBookmarkLine className="remix" />
        </div>
        <div className="stats">{likeCount} likes</div>
        <div className="caption">{caption}</div>
      </div>
    </article>
  );
};
