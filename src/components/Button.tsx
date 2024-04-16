import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outline?: Boolean;
  children: string;
  className?: string;
};

const Button = ({ outline, children, className, ...props }: TButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "p-2 rounded-md",
        {
          "bg-primary-500 text-white": !outline,
          "bg-white text-primary-500 border-solid border-primary-500 border-2":
            outline,
        },
        className
      )}
    >
      {props.type == "submit" ? children.toUpperCase() : children}
    </button>
  );
};

export default Button;
