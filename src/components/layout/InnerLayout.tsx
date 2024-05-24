"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "../buttons/Button";
import LeftChevron from "@/assets/icons/chevron-left.svg";

type TProps = {
  children: React.ReactNode;
  title: string;
  option?: React.ReactNode;
};

const InnerLayout = (props: TProps) => {
  // const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center items-center bg-white z-40 h-16 w-full sticky top-0">
        <div className="w-2/12 flex justify-center">
          <Button onClick={() => router.back()}>
            <LeftChevron />
          </Button>
        </div>
        <div className="w-8/12 text-center">
          <h5>{props.title}</h5>
        </div>
        <div className="w-2/12">{props.option}</div>
      </div>
      <main className="pt-3">{props.children}</main>
    </>
  );
};

export default InnerLayout;
