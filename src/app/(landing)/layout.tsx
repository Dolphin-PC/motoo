import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ReactElement } from "react";

const layout = ({ children }: { children: ReactElement }) => {
  return (
    <div>
      <Header />
      <div className="p-10">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
