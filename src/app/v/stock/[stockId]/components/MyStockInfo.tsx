"use client";
import React, { ReactNode, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { amountStockState, inquireDataState } from "../atom";
import Card from "@/components/card/Card";
import NotData from "@/components/icon/NotData";
import Section from "@/components/section/Section";

const MyStockInfo = () => {
  const inquireData = useRecoilValue(inquireDataState);
  const amountStock = useRecoilValue(amountStockState);

  // if (inquireData == null || amountStock == null) return <NotData />;

  /** @desc 평균 체결금액 */
  const avgAmount = useMemo(
    () => Number(amountStock && amountStock.avgAmount),
    [amountStock]
  );
  /** @desc 보유 수량 */
  const stockQuantity = useMemo(
    () => Number(amountStock && amountStock.quantity),
    [amountStock]
  );
  /** @desc 평가 금액 */
  const totalPrice =
    stockQuantity * Number(inquireData && inquireData.output1.stck_prpr) || 0;

  /** @desc 투자 원금 */
  const orgPrice = useMemo(
    () =>
      Number(amountStock?.quantity) *
      Number(amountStock && amountStock.avgAmount),
    [amountStock, amountStock]
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
    <Section
      title="내 주식"
      notData={inquireData == null || amountStock == null}
    >
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
    </Section>
  );
};

export default MyStockInfo;
