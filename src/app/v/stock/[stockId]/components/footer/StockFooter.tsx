"use client";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import { bottomSheetOpenState } from "@/components/bottomSheet/atom";
import Button from "@/components/buttons/Button";
import { isEmpty } from "@/lib/util/util";
import { AmountStock } from "@/pages/model/AmountStock";
import { useRecoilState, useSetRecoilState } from "recoil";
import Sheet from "./Sheet";

type TProps = {
  amountStock: AmountStock;
};

const StockFooter = (props: TProps) => {
  const [
    [isOpenBuySheet, setIsOpenBuySheet],
    [isOpenSellSheet, setIsOpenSellSheet],
  ] = ["buySheet", "sellSheet"].map((v) =>
    useRecoilState(bottomSheetOpenState(v))
  );

  return (
    <footer className="flex flex-row gap-3 p-3 sticky bottom-0 z-20">
      <div className="w-full">
        <Button primary onClick={() => setIsOpenBuySheet(true)}>
          매수
        </Button>
        {isOpenBuySheet && (
          <BottomSheet openStateKey="buySheet">
            <Sheet type="buy" />
          </BottomSheet>
        )}
      </div>
      {!isEmpty(props.amountStock) && (
        <div className="w-full">
          <Button outline onClick={() => setIsOpenSellSheet(true)}>
            매도
          </Button>
        </div>
      )}
      {isOpenSellSheet && (
        <BottomSheet openStateKey="sellSheet">
          <Sheet type="sell" />
        </BottomSheet>
      )}
    </footer>
  );
};

export default StockFooter;
