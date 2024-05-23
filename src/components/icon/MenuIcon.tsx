import Image from "next/image";
import Link from "next/link";
import React from "react";

type TProps = {
  isSelect: boolean;
  iconInfo: TMenuIconProps;
};

export type TMenuIconProps = {
  name: string;
  icon_name: "home" | "line-chart" | "chart-trend" | "archive" | "user";
  href: "main" | "my-stock" | "stock" | "like-stock" | "my";
};

const MenuIcon = ({ isSelect, iconInfo }: TProps) => {
  return (
    <div className="w-full">
      <Link href={`/v/${iconInfo.href}`}>
        <button
          className={`w-full p-4 bg-white border-t-4 ${
            isSelect ? "border-primary-500" : "border-white"
          }`}
        >
          <div className="flex flex-col items-center ">
            <Image
              className=""
              width={24}
              height={24}
              alt={iconInfo.icon_name}
              src={`/icons/${iconInfo.icon_name}.svg`}
            />
            <span
              className={`text-xs ${
                isSelect ? "text-black" : "text-primary-150"
              }`}
            >
              {iconInfo.name}
            </span>
          </div>
        </button>
      </Link>
    </div>
  );
};

export default MenuIcon;
