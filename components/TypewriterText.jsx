import React, { useState, useEffect } from "react";
import "./TypewriterText.css";

const TypewriterText = () => {
  const lst = ["you", "your business", "your academics"];
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (currentText.length < lst[index].length) {
      interval = setInterval(() => {
        setCurrentText(lst[index].slice(0, currentText.length + 1));
      }, 100);
    } else {
      setTimeout(() => {
        setCurrentText("");
        setIndex((prevIndex) => (prevIndex + 1) % lst.length);
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [currentText, index, lst]);

  return <span className="typewriter">{currentText}</span>;
};

export default TypewriterText;
