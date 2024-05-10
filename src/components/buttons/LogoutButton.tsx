"use client";

import React from "react";
import Button, { TButtonProps } from "./Button";
import { signOut } from "next-auth/react";

const LogoutButton = (props: TButtonProps): React.ReactNode => {
  return (
    <Button {...props} onClick={() => signOut()}>
      {props.children}
    </Button>
  );
};

export default LogoutButton;
