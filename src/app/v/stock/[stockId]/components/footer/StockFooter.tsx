"use client";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import { bottomSheetOpenState } from "@/components/bottomSheet/atom";
import Button from "@/components/buttons/Button";
import { isEmpty } from "@/lib/util/util";
import { useRecoilState, useRecoilValue } from "recoil";
import Sheet from "./Sheet";
import { amountStockState } from "../../atom";

const StockFooter = () => {
  const amountStock = useRecoilValue(amountStockState);
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
            <Sheet type="BUY" />
          </BottomSheet>
        )}
      </div>
      {!isEmpty(amountStock) && (
        <div className="w-full">
          <Button outline onClick={() => setIsOpenSellSheet(true)}>
            매도
          </Button>
        </div>
      )}
      {isOpenSellSheet && (
        <BottomSheet openStateKey="sellSheet">
          <Sheet type="SELL" />
        </BottomSheet>
      )}
    </footer>
  );
};

export default StockFooter;
