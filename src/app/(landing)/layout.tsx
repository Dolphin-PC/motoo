import React from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ReactElement } from "react";

const layout = async ({ children }: { children: ReactElement }) => {
  return (
    <div className="h-full overflow-auto hide-scrollbar">
      <div className="sticky top-0">
        <Header />
      </div>
      <div className="bg-white">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
