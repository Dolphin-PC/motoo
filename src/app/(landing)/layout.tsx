import React from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ReactElement } from "react";

const layout = async ({ children }: { children: ReactElement }) => {
  return (
    <div className="h-full">
      <Header />
      <div className="bg-white p-10">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
