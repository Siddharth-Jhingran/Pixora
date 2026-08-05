import React, { useContext } from "react";
import "../styles/styles.scss";
import { Link } from "react-router";
import axios from "axios";
import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router";
import { PixoraSkeleton } from "../../Skeleton/PixoraSkeleton";


const Login = () => {
  const [userName, setuserName] = useState("")
  const [password, setpassword] = useState("")
  const {handleLogin, loading} = useAuth()
  const navigate = useNavigate()

  if (loading){
    // return  <img className="emptyState" src="/write_Is_Loading_at_the.gif" alt="No posts available" />
    return <PixoraSkeleton />
  }


  async function submitHandler(e){
    e.preventDefault();
    await handleLogin(userName, password)
    .then(res=>{
      console.log(res)
      navigate('/')
    })
  }
  return (
    <>
      <main className="loginPage">
        <div className="loginContainer">
        <h1>Login</h1>
        <form action="" onSubmit={submitHandler}>
          <input required onChange={(e)=>{setuserName(e.target.value)}} type="text" placeholder="Enter username" />
          <input required onChange={(e)=>{setpassword(e.target.value)}} type="password" placeholder="Enter password" />
          <button>Submit</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="alreadyauth" to={"/registration"}>
            Registration
          </Link>
        </p>
        </div>
      </main>
    </>
  );
};

export default Login;
