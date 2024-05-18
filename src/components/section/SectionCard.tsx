import React from "react";
import RightChevron from "@/assets/icons/chevron-right.svg";
import Link from "next/link";

type TProps = {
  title: string;
  href?: string;
  amountUnit: "KRW" | "USD" | "건";
  amount: number;
  children?: React.ReactNode;
  className?: HTMLDivElement["className"];
};

const SectionCard = (props: TProps): React.ReactNode => {
  const { title = "제목", amount = 0, amountUnit = "건" } = props;
  const Amount = ({
    amountUnit,
    amount,
  }: {
    amountUnit: TProps["amountUnit"];
    amount: TProps["amount"];
  }): React.ReactNode => {
    let value = "";
    if (amountUnit === "KRW") value = `₩ ${amount.toLocaleString()}`;
    if (amountUnit === "USD") value = `$ ${amount.toLocaleString()}`;
    if (amountUnit === "건") value = `${amount.toLocaleString()} 건`;
    return <h4>{value}</h4>;
  };
  return (
    <div
      className={`flex flex-col p-2 h-full rounded-lg ${props.className}`}
      style={{
        flex: "0 0 auto",
      }}
    >
      <div className="flex items-center justify-between">
        <p>{title}</p>
        {props.href && (
          <Link href={props.href}>
            <RightChevron />
          </Link>
        )}
      </div>
      <main>
        <Amount amountUnit={amountUnit} amount={amount} />
        {props.children}
      </main>
    </div>
  );
};

export default SectionCard;
