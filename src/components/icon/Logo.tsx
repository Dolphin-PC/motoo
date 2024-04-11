import React from "react";
import LogoSvg from "@assets/icons/main_icon.svg";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="w-16">
        <LogoSvg />
      </div>
      <p className="font-bold">모투</p>
    </div>
  );
};

export default Logo;
