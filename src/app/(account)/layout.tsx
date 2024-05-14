import Header from "@/components/layout/Header";
import React from "react";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-0">
        <Header />
      </div>
      <div className="flex-1 p-10 bg-white">{children}</div>
      {/* <div className="w-6/12 bg-primary-500 flex items-center justify-center">
        <Image
          width={0}
          height={0}
          alt="account"
          src={"/images/account_image.png"}
          sizes="100vw"
          style={{ width: "50%", height: "50%" }}
        />
      </div> */}
    </div>
  );
};

export default AccountLayout;
