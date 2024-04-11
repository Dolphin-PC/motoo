import Button from "@/components/Button";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Link from "next/link";
import React, { ReactElement } from "react";

const layout = ({ children }: { children: ReactElement }) => {
  return (
    <div>
      <Header
        right={
          <div className="flex gap-2">
            <Link href="/sign-in">
              <Button outline>Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        }
      />

      <main className="p-10">{children}</main>

      <Footer />
    </div>
  );
};

export default layout;
