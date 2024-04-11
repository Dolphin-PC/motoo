import { TSignUpProps } from "@/app/(account)/sign-up/page";
import React from "react";
import {
  Path,
  UseControllerProps,
  UseFormRegister,
  useController,
  FieldValues,
} from "react-hook-form";

type TControlProps<T extends FieldValues> = UseControllerProps<T> & {};

const Control = <T extends FieldValues>({ ...props }: TControlProps<T>) => {
  const { field } = useController(props);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onclick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex flex-col bg-primary-100 p-3 cursor-text"
      onClick={onclick}
    >
      <label className="cursor-text" htmlFor={props.name}>
        {props.name.toUpperCase()}
      </label>
      <input
        {...field}
        ref={inputRef}
        placeholder={props.name}
        className="bg-primary-100 outline-none"
      />
    </div>
  );
};

const Input = {
  Control,
};

export default Input;
