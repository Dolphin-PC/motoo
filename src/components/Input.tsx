import { TSignUpProps } from "@/app/(account)/sign-up/page";
import React from "react";
import { Path, UseFormRegister } from "react-hook-form";

type TInputProps = {
  label: Path<TSignUpProps>;
  register: UseFormRegister<TSignUpProps>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: TInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onclick = () => {
    inputRef.current?.focus();
  };
  return (
    <div
      className="flex flex-col bg-primary-100 p-3 cursor-text
     "
      onClick={onclick}
    >
      <label className="cursor-text" htmlFor={props.label}>
        {props.label.toUpperCase()}
      </label>
      <input
        {...props.register(props.label)}
        ref={inputRef}
        placeholder={props.placeholder}
        className="bg-primary-100 outline-none"
      />
    </div>
  );
};

export default Input;
