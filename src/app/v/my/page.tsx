"use client";
import Button from "@/components/Button";
import { signOut } from "next-auth/react";
import React from "react";

const MyPage = () => {
  return (
    <div>
      <Button onClick={() => signOut()}>로그아웃</Button>
    </div>
  );
};

export default MyPage;
