"use client";

import React from "react";
import Button from "./Button";
import { signOut } from "next-auth/react";

const LogoutButton = ({ children }: { children: string }) => {
  return <Button onClick={() => signOut()}>{children}</Button>;
};

export default LogoutButton;
