"use client";
import { AmountStock } from "@/pages/model/AmountStock";
import React from "react";
import { useRecoilValue } from "recoil";
import { inquireDataState } from "./atom";

type TProps = {
  amountStock: AmountStock;
};
const MyStockInfo = (props: TProps) => {
  const { amountStock } = props;

  const inquireData = useRecoilValue(inquireDataState);

  console.log(amountStock);
  return (
    <div>
      <small>1주 평균금액</small>
      <h4></h4>
    </div>
  );
};

export default MyStockInfo;
