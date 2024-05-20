"use client";
import Button from "@/components/buttons/Button";
import React, { useMemo, useState } from "react";
import LeftChevron from "@/assets/icons/chevron-left.svg";
import RightChevron from "@/assets/icons/chevron-right.svg";
import { StockOrderHistory } from "@/pages/model/StockOrderHistory";
import { getKoreanTime } from "@/lib/util/util";
import { OrderType, OrderStatus } from "@/pages/model/StockOrderHistory";

const RevenueCard = ({
  stockOrderHistoryList,
}: {
  stockOrderHistoryList: StockOrderHistory[];
}) => {
  const koreanTime = useMemo(() => getKoreanTime(), []);

  const [nowYear, nowMonth] = useMemo(
    () => [
      koreanTime.getFullYear().toString(),
      (koreanTime.getMonth() + 1).toString().padStart(2, "0"),
    ],
    [koreanTime]
  );

  const [year, setYear] = useState(koreanTime.getFullYear());
  const [month, setMonth] = useState(koreanTime.getMonth() + 1);

  const nextMonth = () => {
    if (month == 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };
  const prevMonth = () => {
    if (month == 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonthDisabled =
    year == Number(nowYear) && month == Number(nowMonth);

  const monthRevenue = stockOrderHistoryList.reduce((acc, history) => {
    if (
      history.orderType == OrderType.SELL &&
      history.orderStatus == OrderStatus.SUCCESS &&
      history.conclusionTime &&
      history.conclusionPrice
    ) {
      const orderTime = new Date(history.conclusionTime);
      if (
        orderTime.getFullYear() == year &&
        orderTime.getMonth() + 1 == month
      ) {
        return acc + history.conclusionPrice * history.orderQuantity;
      }
    }
    return acc;
  }, 0);

  return (
    <div>
      <div className="flex items-center">
        <Button onClick={prevMonth}>
          <LeftChevron />
        </Button>
        <p>
          {year}.{month}월 판매수익
        </p>
        <Button onClick={nextMonth} disabled={nextMonthDisabled}>
          <RightChevron />
        </Button>
      </div>
      <div className="flex gap-2 font-bold text-2xl items-baseline">
        <span>₩</span>
        <div>
          <span>{monthRevenue}</span>
        </div>
        {/* TODO 이전 달 대비 수익률 계산 */}
        {/* <span className="rounded-xl bg-info-500 text-white p-1 text-sm">
          +5.3%
        </span> */}
      </div>
    </div>
  );
};

export default RevenueCard;
