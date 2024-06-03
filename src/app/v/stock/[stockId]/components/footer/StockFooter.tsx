"use client";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import { bottomSheetOpenState } from "@/components/bottomSheet/atom";
import Button from "@/components/buttons/Button";
import { isEmpty } from "@/lib/util/util";
import { useRecoilState, useRecoilValue } from "recoil";
import Sheet from "./Sheet";
import { amountStockState } from "../../atom";
import { useCallback } from "react";
import { TBuySell } from "./sheet/OrderForm";

const StockFooter = () => {
  const amountStock = useRecoilValue(amountStockState);
  const [
    [isOpenBuySheet, setIsOpenBuySheet],
    [isOpenSellSheet, setIsOpenSellSheet],
  ] = ["buySheet", "sellSheet"].map((v) =>
    useRecoilState(bottomSheetOpenState(v))
  );

  // TODO 매수/매도 완료 시, 실시간체결통보 웹소켓 연동

  const handleBuy = useCallback(async (data: TBuySell) => {}, []);
  const handleSell = useCallback((data: TBuySell) => {}, []);

  return (
    <footer className="flex flex-row gap-3 p-3 sticky bottom-0 z-20">
      <div className="w-full">
        <Button primary onClick={() => setIsOpenBuySheet(true)}>
          매수
        </Button>
        {isOpenBuySheet && (
          <BottomSheet openStateKey="buySheet">
            <Sheet type="buy" handleBuySellFn={handleBuy} />
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
          <Sheet type="sell" handleBuySellFn={handleSell} />
        </BottomSheet>
      )}
    </footer>
  );
};

export default StockFooter;
