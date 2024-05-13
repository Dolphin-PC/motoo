import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";
import LogoutButton from "./LogoutButton";
import LinkButton from "./LinkButton";

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: Boolean;
  outline?: Boolean;
  children: React.ReactNode;
  className?: string;
};

const Button = ({
  primary,
  outline,
  children,
  className,
  ...props
}: TButtonProps): React.ReactNode => {
  return (
    <div
      className={clsx(
        "rounded-md w-full text-center",
        { "bg-primary-500 text-white": primary },
        {
          "bg-white text-primary-500 border-solid border-primary-500 border-2":
            outline,
        },
        { "opacity-50": props.disabled },
        className
      )}
    >
      <button className={"p-2 w-full"} {...props}>
        {children}
      </button>
    </div>
  );
};
Button.Logout = LogoutButton;
Button.Link = LinkButton;
export default Button;
