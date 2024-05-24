"use client";
import { AmountStock } from "@/pages/model/AmountStock";
import React, { ReactNode, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { inquireDataState } from "./atom";

type TProps = {
  amountStock: AmountStock;
};
const MyStockInfo = (props: TProps) => {
  const { amountStock } = props;

  const inquireData = useRecoilValue(inquireDataState);

  /** @desc 평균 체결금액 */
  const avgAmount = useMemo(
    () => Number(amountStock.avgAmount),
    [amountStock.avgAmount]
  );
  /** @desc 보유 수량 */
  const stockQuantity = useMemo(
    () => Number(amountStock.quantity),
    [amountStock.quantity]
  );
  /** @desc 평가 금액 */
  const totalPrice =
    stockQuantity * Number(inquireData?.output1.stck_prpr || 0);

  /** @desc 투자 원금 */
  const orgPrice = useMemo(
    () => Number(amountStock.quantity) * Number(amountStock.avgAmount),
    [amountStock.quantity, amountStock.avgAmount]
  );

  const 수익률 = (): ReactNode => {
    const 수익금액 = totalPrice - orgPrice;

    const 수익률 = (수익금액 / orgPrice) * 100;

    if (수익금액 >= 0) {
      return (
        <small>
          <span className="text-primary-500">
            +{수익금액.toLocaleString()}원 (+{수익률.toFixed(2)}%)
          </span>
        </small>
      );
    }
    return (
      <small>
        <span className="text-danger-500">
          {수익금액.toLocaleString()}원 ({수익률.toFixed(2)}%)
        </span>
      </small>
    );
  };

  return (
    <div>
      <small>평균 체결금액</small>
      <h4>{avgAmount.toLocaleString()} 원</h4>
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">보유 수량</span>
          <h5>{stockQuantity.toLocaleString() + "주"}</h5>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-gray-500">평가 금액</span>
          <div className="text-right">
            <h5>{totalPrice.toLocaleString() + "원"}</h5>
            <수익률 />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">투자 원금</span>
          <h5>{orgPrice.toLocaleString() + "원"}</h5>
        </div>
      </div>
    </div>
  );
};

export default MyStockInfo;
