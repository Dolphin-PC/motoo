import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import {
  UseControllerProps,
  useController,
  FieldValues,
} from "react-hook-form";

type TControlProps<T extends FieldValues> = UseControllerProps<T> & {
  attr?: Partial<InputHTMLAttributes<HTMLInputElement>>;
  type: HTMLInputTypeAttribute;
  displayName?: string;
  placeholder?: string;
  readOnly?: boolean;
};

const Control = <T extends FieldValues>({ ...props }: TControlProps<T>) => {
  const { field, formState, fieldState } = useController(props);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onclick = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <div
        className={clsx("flex flex-col bg-primary-100 p-3 cursor-text", {
          "border border-danger-500": formState.errors[props.name],
          "text-primary-500": props.readOnly,
        })}
        onClick={onclick}
      >
        <label className="cursor-text" htmlFor={props.name}>
          {props.displayName ? props.displayName : props.name.toUpperCase()}
          {/* {props.name.toUpperCase()} */}
        </label>
        <input
          {...field}
          ref={inputRef}
          placeholder={props.placeholder ? props.placeholder : props.name}
          className={`bg-primary-100 outline-none`}
          type={props.type}
          readOnly={props.readOnly}
          {...props.attr}
        />
      </div>
      {formState.errors[field.name] && (
        <ErrorMessage
          name={field.name as any}
          errors={formState.errors}
          render={({ message }) => {
            return <small className="text-danger-500">{message}</small>;
          }}
        />
      )}
    </div>
  );
};
// 참고 : src/app/(account)/sign-in/page.tsx
const Input = {
  Control,
};

export default Input;
