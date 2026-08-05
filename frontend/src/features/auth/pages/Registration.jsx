import React from "react";
import "../styles/styles.scss";
import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router";

const Registration = () => {
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      // <main>
        <img
          className="emptyState"
          src="/write_Is_Loading_at_the.gif"
          alt="No posts available"
        />
      // </main>
    );
  }

  async function submitHandler(e) {
    e.preventDefault();
    await handleRegister(userName, email, password).then((res) => {
      console.log(res);
      navigate("/");
    });
  }
  return (
    <>
      <main className="registerPage">
        <div className="registerContainer">
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
        </div>
      </main>
    </>
  );
};

export default Registration;
