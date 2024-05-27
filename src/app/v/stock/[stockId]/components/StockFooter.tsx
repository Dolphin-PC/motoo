"use client";
import Input from "@/components/Input";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import { bottomSheetOpenState } from "@/components/bottomSheet/atom";
import Button from "@/components/buttons/Button";
import { isEmpty } from "@/lib/util/util";
import { AmountStock } from "@/pages/model/AmountStock";
import React, { ReactNode, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Variable } from "./Variable";
import { currentPriceState, inquireDataState } from "../atom";

type TProps = {
  amountStock: AmountStock;
};

const StockFooter = (props: TProps) => {
  const [setIsOpenBuySheet, setIsOpenSellSheet] = ["buySheet", "sellSheet"].map(
    (v) => useSetRecoilState(bottomSheetOpenState(v))
  );

  return (
    <footer className="flex flex-row gap-3 p-3 sticky bottom-0 z-20">
      <Button
        primary
        className="w-full"
        onClick={() => setIsOpenBuySheet(true)}
      >
        매수
      </Button>
      <BottomSheet openStateKey="buySheet">
        <Sheet type="buy" />
      </BottomSheet>
      {!isEmpty(props.amountStock) && (
        <>
          <Button
            outline
            className="w-full"
            onClick={() => setIsOpenSellSheet(true)}
          >
            매도
          </Button>
          <BottomSheet openStateKey="sellSheet">
            <Sheet type="sell" />
          </BottomSheet>
        </>
      )}
    </footer>
  );
};

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
      <h3>{Number(currentPrice).toLocaleString()}원</h3>
      <Variable />
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
          <div className="flex justify-between">
            <h4>호가</h4>
            <small>
              {Number(currentPrice).toLocaleString()} * <Variable />
            </small>
          </div>
          {/* TODO 호가 차트 */}
        </div>
        <Button primary className="w-full fixed left-0 bottom-0 p-2">
          {type === "buy" ? "매수" : "매도"}
        </Button>
      </form>
    </div>
  );
};

export default StockFooter;
