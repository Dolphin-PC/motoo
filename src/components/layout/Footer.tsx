import React from "react";
import Logo from "../icon/Logo";

const Footer = () => {
  return (
    <div
      className="bg-primary-800 pt-5 text-primary-100
    flex flex-col items-center"
    >
      <Logo />

      <ul className="flex gap-3">
        <li>&copy; 2024 Dolphin-PC</li>
        <li>개인정보처리방침</li>
      </ul>
    </div>
  );
};

export default Footer;
