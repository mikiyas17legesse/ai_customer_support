import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav-wrapper">
      <h2 className="nav-header">JIM CHATBOT</h2>
      <ul className="nav-buttons">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Sign Up</a>
        </li>
        <li>
          <button className="gs-btn">
            <span>Get Started</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
