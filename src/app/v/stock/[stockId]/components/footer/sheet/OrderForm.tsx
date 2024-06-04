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
} from "@/pages/service/openapi/biz/inquirePsblOrder";
import {
  TOrderCashReq,
  TOrderCashRes,
} from "@/pages/service/openapi/biz/orderCash";
import { DaoOrderCashReq } from "@/pages/api/stock/order";
import useWebSocket, { SOCKET_STATUS } from "@/lib/hooks/useWebSocket";
import { useClientAccountInfo } from "@/lib/hooks/useClientAccountInfo";
import { decryptAES256, splitWebSocketMessage } from "@/lib/util/util";
import { socketHeaderState } from "@/lib/hooks/atom";

export type TBuySell = {
  orderType: "BUY" | "SELL" | null;
  price: number;
  quantity: number;
  orderDivision: TOrderCashReq["ORD_DVSN"] | null;
  stockId: TOrderCashReq["PDNO"] | null;
};

type TMessage = {
  header: {
    approval_key: string;
    custtype: "P";
    tr_type: "1" | "2";
    "content-type": "utf-8";
  };
  body: {
    input: {
      tr_id: "H0STCNI9";
      tr_key: string;
    };
  };
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

  // 실시간체결통보에 필요한 상태
  const { message, sendMessage, socketStatus, header } =
    useWebSocket("H0STCNI9");
  const accountInfo = useClientAccountInfo();
  const toSendMessage = useRef<null | TMessage>(null);

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

    set실시간체결통보();
    // alert(res.body.msg1);
    console.info(res);
  };

  const set실시간체결통보 = () => {
    if (socketStatus !== SOCKET_STATUS.OPEN) {
      setTimeout(() => set실시간체결통보(), 1000);
      return;
    }
    if (!accountInfo.approvalKey) throw new Error("approvalKey is null");

    toSendMessage.current = {
      header: {
        "content-type": "utf-8",
        approval_key: accountInfo.approvalKey,
        custtype: "P",
        tr_type: "1",
      },
      body: {
        input: {
          tr_id: "H0STCNI9",
          tr_key: "@0851367",
        },
      },
    };

    console.info("실시간체결통보 요청");
    sendMessage(toSendMessage.current);
  };

  useEffect(() => {
    if (!message) return;
    // const { data } = splitWebSocketMessage(message);
    console.log(message);
    console.log("OrderForm > headerRef ::", header);

    // if (headerMessageRef.current) {
    //   const { iv, key } = headerMessageRef.current.body.output;
    //   const decrypt = decryptAES256(data, key, iv);
    //   console.info(decrypt);
    // }
  }, [message]);

  return (
    <div className="mt-5 flex flex-col gap-3">
      <button
        onClick={() => {
          console.log(header);
        }}
      >
        ref console
      </button>
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
        {type === "BUY" ? "매수" : "매도"}주문
      </Button>

      {type === "BUY" && (
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
