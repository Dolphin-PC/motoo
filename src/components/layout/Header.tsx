import React from "react";
import Button from "../Button";
import Logo from "../icon/Logo";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 text-primary-500">
      <Logo />

      <div className="flex gap-2">
        <Button outline>Sign In</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  );
};

export default Header;
