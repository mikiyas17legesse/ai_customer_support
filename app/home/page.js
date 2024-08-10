"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import "./page.css";
import TypewriterText from "@/components/TypewriterText";

const Page = () => {
  return (
    <>
      <NavBar />
      <div className="page-wrapper">
        <div className="center-text">
          <h3>Utilize the best of the best</h3>
          <h1>All the Information</h1>
          <h2 style={{ fontStyle: "italic" }}>
            This chatbot has it all for <TypewriterText />
          </h2>
          <p>
            The chatbot that allows you to search for whatever fits your needs.
            Academic, business related, and plenty more.
          </p>
          <button>Get Started</button>
        </div>
      </div>
    </>
  );
};

export default Page;
