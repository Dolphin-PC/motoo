"use client";

import React from "react";
import Button, { TButtonProps } from "./Button";
import { signOut } from "next-auth/react";
import { signOutCallback } from "@/pages/api/auth/[...nextauth]";

const LogoutButton = (props: TButtonProps): React.ReactNode => {
  const handleSignOut = () => {
    signOut().then(() => {
      signOutCallback();
    });
  };

  return (
    <Button {...props} onClick={handleSignOut}>
      {props.children}
    </Button>
  );
};

export default LogoutButton;
