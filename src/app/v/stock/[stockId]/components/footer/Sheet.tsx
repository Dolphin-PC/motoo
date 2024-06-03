"use client";

import { ReactNode, Suspense, useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { currentPriceState, inquireDataState, stockIdState } from "../../atom";
import Input from "@/components/Input";
import Button from "@/components/buttons/Button";
import HogaChart from "./HogaChart";
import RealTimePrice from "./RealTimePrice";
import Section from "@/components/section/Section";
import { fetchHelperWithData } from "@/lib/api/helper";
import {
  TInquirePsblOrderReq,
  TInquirePsblOrderRes,
} from "@/pages/service/openapi/OpenApiService";
import { useClientAccountInfo } from "@/lib/hooks/useClientAccountInfo";
import Card from "@/components/card/Card";

export type TBuySell = {
  price: number;
  quantity: number;
};
const Sheet = ({
  type,
  handleBuySellFn,
}: {
  type: "buy" | "sell";
  handleBuySellFn: Function;
}): ReactNode => {
  const inquireData = useRecoilValue(inquireDataState);
  const currentPrice = useRecoilValue(currentPriceState);
  const stockId = useRecoilValue(stockIdState);

  const [isLoadingPossible, setIsLoadingPossible] = useState(false);
  const [possibleData, setPossibleData] =
    useState<TInquirePsblOrderRes | null>();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TBuySell>({
    defaultValues: {
      price: 0,
      quantity: 0,
    },
  });

  useEffect(() => {
    setValue("price", currentPrice);
  }, []);

  const setPrice = useCallback((price: number) => {
    setValue("price", price);
  }, []);

  const onSubmit: SubmitHandler<TBuySell> = async (data) => {
    handleBuySellFn(data);
    console.log(data);
  };

  const handlePossible = async () => {
    if (!stockId) return;

    setIsLoadingPossible(true);

    const res = await fetchHelperWithData<
      Omit<TInquirePsblOrderReq, "accountNumber">,
      TInquirePsblOrderRes
    >({
      method: "POST",
      url: "/api/stock/possible-order",
      data: {
        orderPrice: String(getValues("price")),
        orderType: "00",
        stockId: stockId,
      },
      options: {
        cache: "no-cache",
      },
    });

    setPossibleData(res.body);
    setIsLoadingPossible(false);
  };

  return (
    <>
      <Section
        title="실시간 호가"
        className="flex-1 overflow-scroll hide-scrollbar"
      >
        <HogaChart setPrice={setPrice} />
      </Section>

      <Section title={inquireData?.output1.hts_kor_isnm} className="flex-1">
        <RealTimePrice />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 flex flex-col gap-3"
        >
          <Input.Control<TBuySell>
            control={control}
            name="price"
            type="number"
            displayName="가격"
            placeholder="가격"
            rules={{
              required: "가격을 입력해주세요",
              min: {
                value: 0,
                message: "0 이상의 가격을 입력해주세요",
              },
            }}
          />
          <Input.Control<TBuySell>
            control={control}
            name="quantity"
            type="number"
            attr={{
              min: 1,
            }}
            displayName="수량"
            placeholder="수량"
            rules={{
              required: "수량을 입력해주세요",
              min: {
                value: 1,
                message: "1 이상의 수량을 입력해주세요",
              },
            }}
          />

          <Button primary>{type === "buy" ? "매수" : "매도"}</Button>
          <Button
            outline
            type="button"
            onClick={handlePossible}
            disabled={isLoadingPossible}
          >
            {type === "buy" ? "매수가능조회" : "매도가능조회"}
          </Button>

          {possibleData && (
            <div className="flex flex-col gap-3">
              <Card.Text
                label="주문가능현금"
                content={
                  <p>
                    {Number(possibleData.output.ord_psbl_cash).toLocaleString()}
                    원
                  </p>
                }
              />
              <Card.Text
                label="매수가능금액"
                content={
                  <>
                    <p>
                      {Number(
                        possibleData.output.nrcvb_buy_amt
                      ).toLocaleString()}
                      원
                    </p>
                    <small>
                      {Number(
                        possibleData.output.psbl_qty_calc_unpr
                      ).toLocaleString()}
                      원/
                      {Number(
                        possibleData.output.nrcvb_buy_qty
                      ).toLocaleString()}
                      주
                    </small>
                  </>
                }
              />
            </div>
          )}
        </form>
      </Section>
    </>
  );
};

export default Sheet;
