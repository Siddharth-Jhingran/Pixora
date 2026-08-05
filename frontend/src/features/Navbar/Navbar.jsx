import React from 'react'
import './style.scss'
import { useNavigate } from 'react-router'
import useAuth from '../auth/Hooks/useAuth';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleLogout: logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <header className="feedHeader">
      <div className="brandBlock">
        <div className="brandBadge">P</div>
        <div>
          <h1>Pixora</h1>
          <p>Curating your next favorite moment</p>
        </div>
      </div>
      <div className="headerActions">
        {user && <button onClick={() => navigate('/create')}>Create Post</button>}
        <div>
          {user ? <button onClick={handleLogout}>Log Out</button> : <button onClick={() => navigate('/login')}>Log In</button>}
        </div>
      </div>
    </header>
  );
}
