import Logo from "@/components/icon/Logo";
import Header from "@/components/layout/Header";
import Image from "next/image";
import React, { ReactElement } from "react";

const AccountLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex h-screen">
      <div className="absolute w-6/12">
        <Header />
      </div>
      <div className="w-6/12 flex justify-center items-center">
        <div className="w-8/12">{children}</div>
      </div>
      <div className="w-6/12 bg-primary-500 flex items-center justify-center">
        <Image
          width={0}
          height={0}
          alt="account"
          src={"/images/account_image.png"}
          sizes="100vw"
          style={{ width: "50%", height: "50%" }}
        />
      </div>
    </div>
  );
};

export default AccountLayout;
