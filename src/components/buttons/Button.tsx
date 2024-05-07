import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";
import LogoutButton from "./LogoutButton";
import LinkButton from "./LinkButton";

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: Boolean;
  outline?: Boolean;
  children: string;
  className?: string;
};

const Button = ({
  primary,
  outline,
  children,
  className,
  ...props
}: TButtonProps) => {
  return (
    <button
      {...props}
      className={`p-2 rounded-md w-full 
      ${primary && "bg-primary-500 text-white"}
      ${
        outline &&
        "bg-white text-primary-500 border-solid border-primary-500 border-2"
      } ${className}`}
    >
      {props.type == "submit" && typeof children == "string"
        ? children.toUpperCase()
        : children}
    </button>
  );
};
Button.Logout = LogoutButton;
Button.Link = LinkButton;
export default Button;
