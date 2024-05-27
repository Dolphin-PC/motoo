"use client";
import Section from "@/components/section/Section";
import TodayOneMinute from "./components/TodayOneMinute";
import CurrentPrice from "./components/CurrentPrice";
import { RecoilRoot } from "recoil";
import Button from "@/components/buttons/Button";
import { useTabScroll } from "@/lib/hooks/useTabScroll";
import MyStockInfo from "./components/MyStockInfo";
import { AmountStock } from "@/pages/model/AmountStock";
import { isEmpty } from "@/lib/util/util";
import StockInfoComponent from "./components/StockInfoComponent";
import StockFooter from "./components/StockFooter";

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
        {/* 현재가격 */}
        <CurrentPrice stockId={stockId} />
        {/* 탭 */}
        <div ref={headerRef} className="sticky top-20">
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
        </div>
        {/* 차트 */}
        <div tabIndex={0} ref={registryRef}>
          <Section title="차트(30분)">
            <TodayOneMinute stockId={stockId} />
          </Section>
        </div>
        {/* 내 주식 */}
        {!isEmpty(amountStock) && (
          <div tabIndex={1} ref={registryRef}>
            <Section title="내 주식">
              <MyStockInfo amountStock={amountStock} />
            </Section>
          </div>
        )}
        {/* 종목정보 */}
        <div tabIndex={2} ref={registryRef}>
          <Section title="시세">
            <StockInfoComponent stockId={stockId} />
          </Section>
        </div>
      </div>
      {/* 매수/매도 버튼 */}
      <StockFooter amountStock={amountStock} />
    </RecoilRoot>
  );
};

export default ClientContainer;
