import React, { useState, useEffect } from "react";
import { AiFillSetting } from "react-icons/ai";
import "./Setting.scss";

const Setting = ({ children }) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  useEffect(() => {
    const el = document.addEventListener("click", () => {
      setIsSettingOpen(false);
    });
    return () => {
      document.removeEventListener("click", el);
    };
  });
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsSettingOpen(!isSettingOpen);
      }}
    >
      <AiFillSetting style={{ fontSize: "1.5rem" }} />
      {isSettingOpen && children}
    </div>
  );
};

export default Setting;
