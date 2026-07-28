import React from "react";
import "../styles/styles.scss";
import { Link } from "react-router";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [userName, setuserName] = useState("")
  const [password, setpassword] = useState("")

  async function submitHandler(e){
    e.preventDefault();
    await axios.post('http://localhost:3000/api/auth/login',{
      userName,
      password
    },{withCredentials:true})
  }
  return (
    <>
      <main>
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
      </main>
    </>
  );
};

export default Login;
