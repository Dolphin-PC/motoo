import BottomMenu from "@/components/layout/BottomMenu";
import Header from "@/components/layout/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Vlayout = async ({ children }: { children: React.ReactElement }) => {
  const session = await getServerSession();

  if (!session) {
    console.log("not session");
    redirect("/");
  }
  return (
    <div className="h-full">
      <Header />
      <div className="">{children}</div>
      <BottomMenu />
    </div>
  );
};

export default Vlayout;
