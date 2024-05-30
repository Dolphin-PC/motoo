"use client";

import { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useForm, SubmitHandler } from "react-hook-form";
import { currentPriceState, inquireDataState } from "../../atom";
import Input from "@/components/Input";
import Button from "@/components/buttons/Button";
import HogaChart from "./HogaChart";
import RealTimePrice from "./RealTimePrice";
import Section from "@/components/section/Section";

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
    reset,
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
  }, [currentPrice]);

  const onSubmit: SubmitHandler<TBuySell> = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-5 p-3">
      <div className="sticky top-12">
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

            <Button primary className="w-full sticky bottom-5">
              {type === "buy" ? "매수" : "매도"}
            </Button>
          </form>
        </Section>
      </div>

      <Section.Scroll title="호가" className="flex-col">
        <HogaChart />
      </Section.Scroll>
    </div>
  );
};

export default Sheet;
