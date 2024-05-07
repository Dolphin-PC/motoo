import BottomMenu from "@/components/layout/BottomMenu";
import Header from "@/components/layout/Header";

import React from "react";

const Vlayout = async ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="h-full">
      <Header />
      <div className="p-5">{children}</div>
      <BottomMenu />
    </div>
  );
};

export default Vlayout;
