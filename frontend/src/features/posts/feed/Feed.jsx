import React from "react";
import { Posts } from "../components/Posts";
import "../styles/styles.scss";
import { useEffect } from "react";
import { usePost } from "../Hooks/usePost";
import Cookies from "js-cookie";
import { useNavigate } from "react-router"; 

export default function Feed() {
  const { feed, handleGetFeed, loading } = usePost();
  const navigate = useNavigate();

  const isUserLoggedIn = Cookies.get("token")
  if(!isUserLoggedIn){
    navigate("/login")
  }

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main className="feedPage">
        <section className="feed">
        
          <div className="emptyState">Loading your vibrant feed…</div>
        </section>
      </main>
    );
  }

  return (
    <main className="feedPage">
      <section className="feed">
        {/* <header className="feedHeader">
          <div className="brandBlock">
            <div className="brandBadge">P</div>
            <div>
              <h1>Pixora</h1>
              <p>Curating your next favorite moment</p>
            </div>
          </div>
          <div className="headerActions">
            <span className="statChip">✨ Fresh</span>
            <span className="statChip">⚡ Live</span>
          </div>
        </header> */}

        <div className="stories">
          <span className="storyPill">🌈 New highlights</span>
          <span className="storyPill">🎨 Design drops</span>
          <span className="storyPill">📸 Community picks</span>
          <span className="storyPill">⚡ Trending now</span>
        </div>

        {feed.length > 0 ? (
          feed.map((item, index) => <Posts key={item._id || index} user={item.userId} post={item} />)
        ) : (
          <div className="emptyState">No posts yet — check back soon.</div>
        )}
      </section>
    </main>
  );
}
