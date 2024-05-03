"use client";
import React from "react";
import Button from "../buttons/Button";
import Logo from "../icon/Logo";
import Link from "next/link";
import { SessionContextValue, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Header = ({ right }: { right?: React.ReactNode }) => {
  const session = useSession();

  return (
    <div
      className="sticky top-0 bg-white shadow-sm
    flex justify-between items-center p-4 text-primary-500 w-full"
    >
      <Link href={session.status == "authenticated" ? "/v/main" : "/"}>
        <Logo />
      </Link>

      <RightButtons session={session} />
    </div>
  );
};

const RightButtons = ({
  session,
}: {
  session: SessionContextValue;
}): React.ReactElement => {
  switch (session.status) {
    case "authenticated": {
      return (
        <div className="flex gap-2">
          {/* <Button onClick={() => signOut()}>Log Out</Button> */}
          <Image
            src={"/icons/bell.svg"}
            alt="profile"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
      );
    }
    case "unauthenticated": {
      return (
        <div className="flex gap-2">
          <Link href="/sign-in">
            <Button outline>Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      );
    }
  }

  return <></>;
};

export default Header;
