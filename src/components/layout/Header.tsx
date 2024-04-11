import React from "react";
import Button from "../Button";
import Logo from "../icon/Logo";
import Link from "next/link";

const Header = ({ right }: { right?: React.ReactNode }) => {
  return (
    <div className="flex justify-between items-center p-4 text-primary-500">
      <Link href="/">
        <Logo />
      </Link>

      {right}
    </div>
  );
};

export default Header;
