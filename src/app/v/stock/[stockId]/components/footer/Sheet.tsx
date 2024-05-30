"use client";

import { ReactNode, Suspense, useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useForm, SubmitHandler } from "react-hook-form";
import { currentPriceState, inquireDataState } from "../../atom";
import Input from "@/components/Input";
import Button from "@/components/buttons/Button";
import HogaChart from "./HogaChart";
import RealTimePrice from "./RealTimePrice";
import Section from "@/components/section/Section";
import MyAmountMoney from "./MyAmountMoney";

type TBuySell = {
  price: number;
  quantity: number;
};
const Sheet = ({ type }: { type: "buy" | "sell" }): ReactNode => {
  const inquireData = useRecoilValue(inquireDataState);
  const currentPrice = useRecoilValue(currentPriceState);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<TBuySell>({
    defaultValues: {
      price: 0,
      quantity: 0,
    },
  });

  useEffect(() => {
    setValue("price", currentPrice);
  }, []);

  const onSubmit: SubmitHandler<TBuySell> = async (data) => {
    console.log(data);
  };

  const setPrice = useCallback((price: number) => {
    setValue("price", price);
  }, []);

  return (
    <div className="flex flex-col p-5 gap-5">
      <div style={{ height: "50vh" }}>
        <Section.Scroll title="실시간 호가" className="flex flex-col">
          <HogaChart setPrice={setPrice} />
        </Section.Scroll>
      </div>

      <div className="sticky bottom-5">
        <Section title={inquireData?.output1.hts_kor_isnm}>
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

            {/* TODO : 매수가능조회 1회 */}
            {/* 총 주문 금액 */}

            <Button primary>{type === "buy" ? "매수" : "매도"}</Button>
            <Suspense fallback={<div>Loading...</div>}>
              <MyAmountMoney />
            </Suspense>
          </form>
        </Section>
      </div>
    </div>
  );
};

export default Sheet;
