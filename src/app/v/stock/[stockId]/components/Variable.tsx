import { ReactNode } from "react";

type TProps = {
  /**변동률 */
  sign?: "1" | "2" | "3" | "4" | "5" | null;
  /**전일대비 변동가격 */
  prev_price?: string | null;
  /**전일대비 변동률 */
  prev_rate?: string | null;
};

/** @desc 변동률 */
export const Variable = (props: TProps): ReactNode => {
  const { prev_price, prev_rate, sign } = props;
  if (!prev_price || !prev_rate || !sign) return <small></small>;

  let className: HTMLDivElement["className"] = "";
  switch (sign) {
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
      {Number(prev_price).toLocaleString()}원 ({prev_rate}%)
    </span>
  );
};
