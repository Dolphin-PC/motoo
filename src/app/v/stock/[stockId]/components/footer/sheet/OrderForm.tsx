"use client";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { orderPriceState, orderQuantityState, orderState } from "./atom";
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
} from "@/service/openapi/biz/inquirePsblOrder";
import { TOrderCashReq, TOrderCashRes } from "@/service/openapi/biz/orderCash";
import { DaoOrderCashReq } from "@/pages/api/stock/order";
import useRealTimeChagyul from "@/lib/hooks/socket/useRealTimeChagyul";
import SnackBar from "@/components/snackbar/SnackBar";
import { snackBarState } from "@/components/snackbar/atom";

export type TBuySell = {
  orderType: "BUY" | "SELL" | null;
  price: number;
  quantity: number;
  orderDivision: TOrderCashReq["ORD_DVSN"] | null;
  stockId: TOrderCashReq["PDNO"] | null;
};

const OrderForm = ({ type }: { type: "BUY" | "SELL" }) => {
  // 상위 화면에서 받아온 값
  const currentPrice = useRecoilValue(currentPriceState);
  const stockId = useRecoilValue(stockIdState);
  const stockPrice = useRecoilValue(stockPriceState);

  // 주문관련 상태
  const [order, setOrder] = useRecoilState<TBuySell>(orderState);
  const [orderPrice, setOrderPrice] = useRecoilState(orderPriceState);
  const [orderQuantity, setOrderQuantity] = useRecoilState(orderQuantityState);

  const [psblData, setPsblData] = useState<TInquirePsblOrderRes | null>(null);

  const { connectSocket, realTimeChagyulData } = useRealTimeChagyul();
  const [snackBarInfo, setSnackBarInfo] = useRecoilState(snackBarState);

  /** 주문요청에 필요한 데이터 SET */
  useEffect(() => {
    if (type === "BUY") {
      setOrder({
        orderType: "BUY",
        price: currentPrice,
        quantity: 0,
        orderDivision: "00",
        stockId: stockId,
      });
    } else {
      setOrder({
        orderType: "SELL",
        price: currentPrice,
        quantity: 0,
        orderDivision: "00",
        stockId: stockId,
      });
    }

    return () => {
      setOrderPrice(0);
      setOrderQuantity(0);
    };
  }, []);

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

  const handleQuantity = ({ value, add }: { value?: number; add?: number }) => {
    if (!value) value = orderQuantity;
    if (add) {
      value += add;
    }
    if (value <= 0) value = 0;
    setOrderQuantity(value);
  };

  /** 주문 처리 */
  const onSubmit = async () => {
    if (!order.stockId) return alert("주식을 선택해주세요");
    if (!order.orderType) return alert("주문타입을 선택해주세요");
    if (!order.orderDivision) return alert("주문구분을 선택해주세요");
    if (order.quantity <= 0) return alert("주문수량을 입력해주세요");
    if (order.price <= 0) return alert("주문가격을 입력해주세요");

    const res = await fetchHelperWithData<DaoOrderCashReq, TOrderCashRes>({
      method: "POST",
      url: "/api/stock/order",
      data: {
        orderType: order.orderType,
        ORD_QTY: String(order.quantity),
        ORD_UNPR: String(order.price),
        ORD_DVSN: order.orderDivision,
        PDNO: order.stockId,
      },
    });

    if (!res.body) throw new Error("주문실패");
    if (res.body.rt_cd != "0") {
      console.error(res);
      alert(res.body.msg1);
      return;
    }
    connectSocket();
    alert(res.body.msg1);
  };

  useEffect(() => {
    if (!realTimeChagyulData) return;
    const { CNTG_ISNM, CNTG_YN, ODER_NO } = realTimeChagyulData;

    if (CNTG_YN == "2") {
      setSnackBarInfo({
        open: true,
        message: `${CNTG_ISNM} 체결이 완료되었습니다.`,
        link: `/v/stock/hisroty/${stockId}?orderNo=${ODER_NO}`,
      });
    }
  }, [realTimeChagyulData]);

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

      <Section title="주문수량">
        <div className="flex flex-row items-center">
          <h4 className="flex-1">{orderQuantity.toLocaleString()}주</h4>
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
        </div>

        {psblData && (
          <div className="flex flex-row ">
            <Button
              onClick={() =>
                handleQuantity({
                  value: Math.floor(
                    Number(psblData!.output.nrcvb_buy_qty) / 10
                  ),
                })
              }
            >
              10%
            </Button>
            <Button
              onClick={() =>
                handleQuantity({
                  value: Math.floor(Number(psblData!.output.nrcvb_buy_qty) / 4),
                })
              }
            >
              25%
            </Button>
            <Button
              onClick={() =>
                handleQuantity({
                  value: Math.floor(Number(psblData!.output.nrcvb_buy_qty) / 2),
                })
              }
            >
              50%
            </Button>
            <Button
              onClick={() =>
                handleQuantity({
                  value: Math.floor(Number(psblData!.output.nrcvb_buy_qty)),
                })
              }
            >
              최대
            </Button>
          </div>
        )}
      </Section>

      <Button primary onClick={onSubmit}>
        {type === "BUY" ? "매수" : "매도"}주문
      </Button>

      {type === "BUY" && (
        <BuyPossible
          stockId={stockId}
          orderPrice={orderPrice}
          setPsblData={setPsblData}
        />
      )}

      <SnackBar />
    </div>
  );
};

export const BuyPossible = ({
  stockId,
  orderPrice,
  setPsblData,
}: {
  stockId: string | null;
  orderPrice: number;
  setPsblData: React.Dispatch<
    React.SetStateAction<TInquirePsblOrderRes | null>
  >;
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
    });

    if (res.body) {
      setPossibleData(res.body);
      setPsblData(res.body);
    }

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
