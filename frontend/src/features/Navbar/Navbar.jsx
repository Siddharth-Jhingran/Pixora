import React from 'react'
import './style.scss'
import { useNavigate } from 'react-router'
import Cookies from "js-cookie";

export const Navbar = () => {
    const navigate = useNavigate()

    const isTokenExists = Cookies.get("token")
    async function handleLogout(){
        Cookies.remove("token")
        navigate("/login")
    }


  return (<>
  <header className="feedHeader">
          <div className="brandBlock">
            <div className="brandBadge">P</div>
            <div>
              <h1>Pixora</h1>
              <p>Curating your next favorite moment</p>
            </div>
          </div>
          <div className="headerActions">
            <button  onClick={() =>{navigate("/create")}}>✨ Create Post</button>
            <div>
              {isTokenExists ? <button onClick={handleLogout}>Log Out</button> : <button onClick={()=>{navigate("/login")}}>Log In</button>}
            </div>
          </div>        
        </header>
  
  
  </>
    
  )
}
