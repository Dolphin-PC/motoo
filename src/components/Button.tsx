import clsx from "clsx";
import React, { HTMLAttributes } from "react";

const Button = ({
  outline,
  children,
  className,
}: {
  outline?: Boolean;
  children: string;
  className?: string;
}) => {
  return (
    <button
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
      {children}
    </button>
  );
};

export default Button;
