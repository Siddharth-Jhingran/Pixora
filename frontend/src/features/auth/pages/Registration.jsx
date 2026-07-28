import React from "react";
import "../styles/styles.scss";
import { Link } from "react-router";
import { useState } from "react";
import axios from 'axios'

const Registration = () => {
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    console.log("pehla")
    try{

      await axios.post('http://localhost:3000/api/auth/register', {
        userName,
        email,
        password
      },
      {withCredentials:true}
    );
    

  }
  catch(err){
    throw err;
  }
  }
  return (
    <>
      <main>
        <h1>Registration</h1>
        <form action="" onSubmit={submitHandler}>
          <input
            onChange={(e) => {
              setuserName(e.target.value);
            }}
            type="text"
            value={userName}
            placeholder="Enter username"
            required
          />
          <input
            onChange={(e) => {
              setemail(e.target.value);
            }}
            type="text"
            value={email}
            placeholder="Enter email"
            required
          />
          <input
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="text"
            value={password}
            placeholder="Enter password"
            required
          />
          <button>Submit</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="alreadyauth" to={"/login"}>
            Login
          </Link>
        </p>
      </main>
    </>
  );
};

export default Registration;
