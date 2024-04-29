"use client";
import React from "react";
import Button from "../Button";
import Logo from "../icon/Logo";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { signOut, useSession } from "next-auth/react";

const Header = ({ right }: { right?: React.ReactNode }) => {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between items-center p-4 text-primary-500">
      <Link href="/">
        <Logo />
      </Link>

      {session?.user ? (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              signOut();
            }}
          >
            Log Out
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link href="/sign-in">
            <Button outline>Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
