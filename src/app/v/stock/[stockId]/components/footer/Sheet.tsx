"use client";

import { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useForm, SubmitHandler } from "react-hook-form";
import { Variable } from "../Variable";
import { currentPriceState, inquireDataState } from "../../atom";
import Input from "@/components/Input";
import Button from "@/components/buttons/Button";
import HogaChart from "./HogaChart";
import useRealTimePrice from "./useRealTimePrice";
import RealTimePrice from "./RealTimePrice";

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
    <div className="p-3">
      <h5>{inquireData?.output1.hts_kor_isnm}</h5>

      {/* <h3>{Number(currentPrice).toLocaleString()}원</h3>
      <Variable /> */}
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
        <div>
          <div className="flex justify-between items-baseline">
            <h4>호가</h4>
            <small>
              {Number(currentPrice).toLocaleString()} <Variable />
            </small>
          </div>
          <HogaChart />
        </div>
        <Button primary className="w-full fixed left-0 bottom-0">
          {type === "buy" ? "매수" : "매도"}
        </Button>
      </form>
    </div>
  );
};

export default Sheet;
