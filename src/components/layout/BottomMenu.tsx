"use client";

import { usePathname } from "next/navigation";
import MenuIcon, { TMenuIconProps } from "../icon/MenuIcon";

const BottomMenu = () => {
  const menuList: TMenuIconProps[] = [
    {
      name: "메인",
      icon_name: "home",
      href: "main",
    },
    {
      name: "내 주식",
      icon_name: "line-chart",
      href: "my-stock",
    },
    {
      name: "주식 주문",
      icon_name: "chart-trend",
      href: "stock",
    },
    {
      name: "관심종목",
      icon_name: "archive",
      href: "like-stock",
    },
    {
      name: "내 정보",
      icon_name: "user",
      href: "my",
    },
  ];

  const pathname = usePathname();
  const currentMenu = menuList.find((menu) => {
    return pathname?.split("/")[2] === menu.href;
  });

  return (
    <div className="flex sticky bottom-0 w-full">
      {menuList.map((menu, index) => (
        <div key={index} className="flex flex-1 flex-col">
          <MenuIcon isSelect={currentMenu == menu} iconInfo={menu} />
        </div>
      ))}
    </div>
  );
};

export default BottomMenu;
