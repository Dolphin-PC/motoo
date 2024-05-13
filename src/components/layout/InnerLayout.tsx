"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Button from "../buttons/Button";

type TProps = {
  children: React.ReactNode;
  title: string;
  option?: React.ReactNode;
};

const InnerLayout = (props: TProps) => {
  // const pathname = usePathname();
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="w-2/12">
          <Button outline onClick={() => router.back()}>
            back
          </Button>
        </div>
        <div className="w-8/12 text-center">{props.title}</div>
        <div className="w-2/12">{props.option}</div>
      </div>
      <main className="pt-3">{props.children}</main>
    </div>
  );
};

export default InnerLayout;
