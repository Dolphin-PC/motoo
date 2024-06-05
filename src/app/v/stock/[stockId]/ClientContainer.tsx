"use client";
import Section from "@/components/section/Section";
import TodayOneMinute from "./components/TodayOneMinute";
import CurrentPrice from "./components/CurrentPrice";
import { RecoilRoot } from "recoil";
import { useTabScroll } from "@/lib/hooks/useTabScroll";
import MyStockInfo from "./components/MyStockInfo";
import { AmountStock } from "@/model/AmountStock";
import { isEmpty } from "@/lib/util/util";
import StockInfoComponent from "./components/StockInfoComponent";
import StockFooter from "./components/footer/StockFooter";
import AtomInit from "./components/AtomInit";

type TProps = {
  stockId: string;
  amountStock: AmountStock;
};
const ClientContainer = (props: TProps) => {
  const { stockId, amountStock } = props;

  const { registryRef, headerRef, handleScroll } = useTabScroll();

  return (
    <RecoilRoot>
      <div className="flex flex-col gap-5">
        <AtomInit stockId={stockId} amountStock={amountStock} />
        {/* 현재가격 */}
        <CurrentPrice />
        {/* 탭 */}
        {/* FIXME : Tab Scroll 시, 화면 어그러짐 */}
        {/* <div ref={headerRef} className="sticky top-0">
          <Section.Scroll>
            <Button tabIndex={0} onClick={handleScroll}>
              차트
            </Button>
            {!isEmpty(amountStock) && (
              <Button tabIndex={1} onClick={handleScroll}>
                내 주식
              </Button>
            )}
            <Button tabIndex={2} onClick={handleScroll}>
              종목정보
            </Button>
          </Section.Scroll>
        </div> */}
        {/* 분봉차트 */}
        <div tabIndex={0} ref={registryRef}>
          <TodayOneMinute />
        </div>
        <Section.Link title="주문내역" href={`/v/stock/history/${stockId}`} />
        {/* 내 주식 */}
        {!isEmpty(amountStock) && (
          <div tabIndex={1} ref={registryRef}>
            <MyStockInfo />
          </div>
        )}
        {/* 종목정보 */}
        <div tabIndex={2} ref={registryRef}>
          <StockInfoComponent />
        </div>
      </div>
      {/* 매수/매도 버튼 */}
      <StockFooter />
    </RecoilRoot>
  );
};

export default ClientContainer;
