"use client";

import React from "react";
import Button, { TButtonProps } from "./Button";

const ActionButton = (props: TButtonProps) => {
  return (
    <Button
      {...props}
      className="w-fit text-primary-500"
      style={{ textDecoration: "underline" }}
    />
  );
};

export default ActionButton;
