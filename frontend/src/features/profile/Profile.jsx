import { useEffect, useMemo, useState } from "react";
import { RiImageLine, RiLock2Line, RiSettings4Line } from "@remixicon/react";
import { useNavigate } from "react-router";
import useAuth from "../auth/Hooks/useAuth";
import { userAllPosts } from "../posts/services/post.api";
import "./profile.scss";

const makeInitials = (name = "P") =>
  name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    let active = true;
    async function loadPosts() {
      setLoading(true);
      setError("");
      try {
        const response = await userAllPosts();
        if (active) setPosts(response.data || []);
      } catch {
        if (active) setError("We couldn't load your posts right now.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPosts();
    return () => { active = false; };
  }, [user, navigate]);

  const profile = useMemo(() => ({
    name: user?.userName || user?.user || "pixora_user",
    bio: user?.bio || "Sharing the moments that matter.",
    avatar: user?.profilePic,
    cover: user?.coverPic,
  }), [user]);

  if (!user) return null;

  return (
    <main className="profilePage">
      <section className="profileShell" aria-label={`${profile.name}'s profile`}>
        <div className="profileCover" style={profile.cover ? { backgroundImage: `url(${profile.cover})` } : undefined}>
          <div className="coverGlow" />
        </div>

        <div className="profileBody">
          <div className="profileTopline">
            <div className="avatarRing">
              {profile.avatar ? (
                <img src={profile.avatar} alt={`${profile.name}'s profile`} />
              ) : (
                <span>{makeInitials(profile.name)}</span>
              )}
            </div>
            <button className="profileAction" type="button" aria-label="Profile settings" title="Profile settings">
              <RiSettings4Line />
            </button>
          </div>

          <div className="profileIdentity">
            <span className="eyebrow"><RiLock2Line /> Your profile</span>
            <h1>{profile.name}</h1>
            <p className="handle">@{profile.name.replace(/\s+/g, "").toLowerCase()}</p>
            <p className="bio">{profile.bio}</p>
          </div>

          <div className="profileStats" aria-label="Profile statistics">
            <div><strong>{posts.length}</strong><span>Posts</span></div>
            <div><strong>0</strong><span>Followers</span></div>
            <div><strong>0</strong><span>Following</span></div>
          </div>

          <div className="profileContentHeader">
            <div>
              <span className="eyebrow"><RiImageLine /> Gallery</span>
              <h2>Your posts</h2>
            </div>
            <span className="postCount">{posts.length} {posts.length === 1 ? "post" : "posts"}</span>
          </div>

          {loading ? (
            <div className="profileGrid profileGridLoading" aria-label="Loading posts">
              {[1, 2, 3].map((item) => <div className="postSkeleton" key={item} />)}
            </div>
          ) : error ? (
            <div className="profileEmpty"><p>{error}</p><button type="button" onClick={() => window.location.reload()}>Try again</button></div>
          ) : posts.length ? (
            <div className="profileGrid">
              {posts.map((post) => (
                <article className="profilePost" key={post._id}>
                  <img src={post.imgURL} alt={post.caption || "Your Pixora post"} />
                  {post.caption && <p>{post.caption}</p>}
                </article>
              ))}
            </div>
          ) : (
            <div className="profileEmpty">
              <div className="emptyIcon"><RiImageLine /></div>
              <h3>Your gallery is waiting</h3>
              <p>Share your first moment and it will appear here.</p>
              <button type="button" onClick={() => navigate("/create")}>Create a post</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
