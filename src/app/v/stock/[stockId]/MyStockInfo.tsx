"use client";
import { AmountStock } from "@/pages/model/AmountStock";
import React, { ReactNode, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { inquireDataState } from "./atom";
import Card from "@/components/card/Card";

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
        <Card.Text
          label="보유 수량"
          content={stockQuantity.toLocaleString() + "주"}
        />
        <Card.Text label="평가 금액">
          <div className="text-right">
            <h5>{totalPrice.toLocaleString() + "원"}</h5>
            <수익률 />
          </div>
        </Card.Text>
        <Card.Text
          label="투자 원금"
          content={orgPrice.toLocaleString() + "원"}
        />
      </div>
    </div>
  );
};

export default MyStockInfo;
