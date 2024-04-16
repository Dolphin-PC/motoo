import { TSignUpProps } from "@/app/(account)/sign-up/page";
import clsx from "clsx";
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
  const { field, formState } = useController(props);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onclick = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <div
        className={clsx("flex flex-col bg-primary-100 p-3 cursor-text", {
          "border border-danger-500": formState.errors[props.name],
        })}
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
      {formState.errors[props.name] && (
        <small className="text-danger-500">
          {props.name.toUpperCase()} field is required
        </small>
      )}
    </div>
  );
};

const Input = {
  Control,
};

export default Input;
