import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { inquireDataState } from "../atom";

/** @desc 변동률 */
export const Variable = (): ReactNode => {
  const inquireData = useRecoilValue(inquireDataState);
  if (inquireData?.output1) {
    let className: HTMLDivElement["className"] = "";
    switch (inquireData.output1.prdy_vrss_sign) {
      case "1":
      case "2":
        className = "text-danger-500";
        break;
      case "4":
      case "5":
        className = "text-secondary-650";
        break;
    }
    return (
      <span className={`${className} font-bold`}>
        {Number(inquireData.output1.prdy_vrss).toLocaleString()}원 (
        {inquireData.output1.prdy_ctrt}%)
      </span>
    );
  }
  return <small></small>;
};
