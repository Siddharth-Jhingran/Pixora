import React from 'react'
import './style.scss'
import { useNavigate } from 'react-router'
import useAuth from '../auth/Hooks/useAuth';
import { RiAddBoxLine, RiUserLine } from '@remixicon/react';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleLogout: logout } = useAuth();
  const userName = user?.userName || user?.user || "Profile";

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <header className="feedHeader">
      <div className="brandBlock" onClick={() => navigate('/')}>
        <div className="brandBadge"><img src="./PIXORA_LOGO_only.png" alt="Pixora Logo" /></div>
        <div>
          <h1>Pixora</h1>
          <p className="brandDescription">Curating your next favorite moment</p>
        </div>
      </div>
      <div className="headerActions">
        {user && <button onClick={() => navigate('/create')}><RiAddBoxLine className="authLogo" /><span className="authText">Create Post</span></button>}
        <div>
          {user ? <img onClick={()=>navigate("/profile")} src={user.profilePic} alt={userName} className="authProfilePic" /> : <button onClick={() => navigate('/login')}><RiUserLine className="authLogo" /><span className="authText">Log In</span></button>}
        </div>
      </div>
    </header>
  );
}
