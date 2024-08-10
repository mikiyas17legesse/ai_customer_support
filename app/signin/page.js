"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/config/auth";
import "./page.css";
import NavBar from "@/components/NavBar";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    setError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please enter all the fields");
      return;
    }
    try {
      await signIn(email, password);
      setSubmitted(true);
      setError("");
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>Successfully Logged in!!</h1>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>{error}</h1>
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="form">
          <h1>Sign In</h1>
          <div className="messages">
            {errorMessage()}
            {successMessage()}
          </div>
          <form>
            <label className="label">Email</label>
            <input
              onChange={handleEmail}
              className="input"
              value={email}
              type="email"
            />
            <label className="label">Password</label>
            <input
              onChange={handlePassword}
              className="input"
              value={password}
              type="password"
            />
            <button onClick={handleSubmit} className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
