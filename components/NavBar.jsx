import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { logOut } from "@/config/auth";
import "./NavBar.css";
import { Button } from "@mui/material";

const NavBar = () => {
  const { user } = useAuth();

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="nav-wrapper">
      <h2 className="nav-header">JIM CHATBOT</h2>
      <ul className="nav-buttons">
        <li>
          <Link href="/home">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/">Chatbot</Link>
            </li>
            <li>
              <button className="btn" onClick={handleLogOut}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/signin">Sign in</Link>
            </li>
            <li>
              <Link href="/getstarted">
                <span className="gs-btn">
                  <span>Get Started</span>
                </span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
