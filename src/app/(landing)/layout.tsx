import Button from "@/components/Button";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Link from "next/link";
import { ReactElement } from "react";

const layout = ({ children }: { children: ReactElement }) => {
  return (
    <div>
      <Header />

      <main className="p-10">{children}</main>

      <Footer />
    </div>
  );
};

export default layout;
