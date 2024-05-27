import BottomMenu from "@/components/layout/BottomMenu";
import Header from "@/components/layout/Header";

import React from "react";

const Vlayout = async ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-0 sticky top-0">
        <Header />
      </div>
      <div className="flex-1 pb-3 bg-white overflow-y-scroll hide-scrollbar">
        {children}
      </div>
      <div className="flex-0 sticky bottom-0">
        <BottomMenu />
      </div>
    </div>
  );
};

export default Vlayout;
