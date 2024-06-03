"use client";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { orderPriceState, orderQuantityState } from "./atom";
import {
  currentPriceState,
  stockIdState,
  stockPriceState,
} from "../../../atom";
import { fetchHelperWithData } from "@/lib/api/helper";
import Button from "@/components/buttons/Button";
import Card from "@/components/card/Card";
import DownChevron from "@/assets/icons/chevron-down.svg";
import Section from "@/components/section/Section";
import {
  TInquirePsblOrderReq,
  TInquirePsblOrderRes,
} from "@/pages/service/openapi/biz/inquirePsblOrder";

export type TBuySell = {
  price: number;
  quantity: number;
};

const OrderForm = ({
  type,
  handleBuySellFn,
}: {
  type: "buy" | "sell";
  handleBuySellFn: Function;
}) => {
  const currentPrice = useRecoilValue(currentPriceState);
  const stockId = useRecoilValue(stockIdState);
  const stockPrice = useRecoilValue(stockPriceState);

  const [orderPrice, setOrderPrice] = useRecoilState(orderPriceState);
  const [orderQuantity, setOrderQuantity] = useRecoilState(orderQuantityState);

  useEffect(() => {
    setOrderPrice(currentPrice);

    return () => {
      setOrderPrice(0);
      setOrderQuantity(0);
    };
  }, []);

  /** 상한가/하한가, 호가단위로 가격조절 */
  const handlePrice = ({ value, add }: { value?: number; add?: number }) => {
    if (!value) value = orderPrice;
    if (add) {
      value += add;
    }

    if (value <= stockPrice.minPrice) value = stockPrice.minPrice;
    if (value >= stockPrice.maxPrice) value = stockPrice.maxPrice;
    setOrderPrice(value);
  };

  const priceUnit = useMemo(() => {
    if (!currentPrice) return 1;
    if (currentPrice < 2_000) return 1;
    if (currentPrice < 5_000) return 5;
    if (currentPrice < 20_000) return 10;
    if (currentPrice < 50_000) return 50;
    if (currentPrice < 200_000) return 100;
    if (currentPrice < 500_000) return 500;
    return 1_000;
  }, [currentPrice]);

  const handleQuantity = ({ value, add }: { value?: number; add?: number }) => {
    if (!value) value = orderQuantity;
    if (add) {
      value += add;
    }
    if (value <= 0) value = 0;
    setOrderQuantity(value);
  };

  const onSubmit = async () => {
    // TODO 매수/매도 API 호출
    handleBuySellFn({ price: orderPrice, quantity: orderQuantity });
  };

  return (
    <div className="mt-5 flex flex-col gap-3">
      <Section
        title="주문가격"
        childrenProps={{ className: "flex flex-row items-center" }}
      >
        <h4 className="flex-1">{orderPrice.toLocaleString()}원</h4>
        <Button
          type="button"
          outline
          className="rotate-180"
          onClick={() => handlePrice({ add: priceUnit })}
        >
          <DownChevron />
        </Button>
        <Button
          type="button"
          outline
          onClick={() => handlePrice({ add: -priceUnit })}
        >
          <DownChevron />
        </Button>
      </Section>

      <Section
        title="주문수량"
        childrenProps={{ className: "flex flex-row items-center" }}
      >
        <h4 className="flex-1">
          <input
            type="number"
            value={orderQuantity.toLocaleString()}
            onChange={(e) =>
              handleQuantity({ value: Number(e.target.value) || 0 })
            }
          />
        </h4>
        <Button
          type="button"
          outline
          className="rotate-180"
          onClick={() => handleQuantity({ add: 1 })}
        >
          <DownChevron />
        </Button>
        <Button
          type="button"
          outline
          onClick={() => handleQuantity({ add: -1 })}
        >
          <DownChevron />
        </Button>
      </Section>

      <Button primary onClick={onSubmit}>
        {type === "buy" ? "매수" : "매도"}주문
      </Button>

      {type === "buy" && (
        <BuyPossible stockId={stockId} orderPrice={orderPrice} />
      )}
    </div>
  );
};

export const BuyPossible = ({
  stockId,
  orderPrice,
}: {
  stockId: string | null;
  orderPrice: number;
}): ReactNode => {
  const [isLoadingPossible, setIsLoadingPossible] = useState(false);
  const [possibleData, setPossibleData] =
    useState<TInquirePsblOrderRes | null>();

  useEffect(() => {
    handlePossible(orderPrice);
  }, []);

  /** 매수가능조회 */
  const handlePossible = async (price?: number) => {
    if (!stockId) return;
    if (!price) price = orderPrice;

    setIsLoadingPossible(true);

    const res = await fetchHelperWithData<
      Omit<TInquirePsblOrderReq, "accountNumber">,
      TInquirePsblOrderRes
    >({
      method: "POST",
      url: "/api/stock/possible-order",
      data: {
        orderPrice: String(price),
        orderType: "00",
        stockId: stockId,
      },
      options: {
        cache: "no-cache",
      },
    });

    console.log(res);

    setPossibleData(res.body);
    setIsLoadingPossible(false);
  };

  return (
    <>
      <Button
        outline
        type="button"
        onClick={() => handlePossible()}
        disabled={isLoadingPossible}
      >
        매수가능조회
      </Button>

      {possibleData && possibleData.output && (
        <div className="flex flex-col gap-3">
          <Card.Text
            label="주문가능현금"
            content={
              <p>
                {Number(possibleData.output.ord_psbl_cash).toLocaleString()}원
              </p>
            }
          />
          <Card.Text
            label="매수가능금액"
            content={
              <>
                <p>
                  {Number(possibleData.output.nrcvb_buy_amt).toLocaleString()}원
                </p>
                <small>
                  {Number(
                    possibleData.output.psbl_qty_calc_unpr
                  ).toLocaleString()}
                  원/
                  {Number(possibleData.output.nrcvb_buy_qty).toLocaleString()}주
                </small>
              </>
            }
          />
        </div>
      )}
    </>
  );
};

export default OrderForm;
