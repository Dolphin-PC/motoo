"use client";

import React from "react";
import Button from "./Button";
import { signOut } from "next-auth/react";

const LogoutButton = ({ children }: { children: string }) => {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })}
    >
      {children}
    </Button>
  );
};

export default LogoutButton;
