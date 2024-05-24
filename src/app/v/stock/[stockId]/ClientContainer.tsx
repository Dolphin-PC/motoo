"use client";
import Section from "@/components/section/Section";
import TodayOneMinute from "./TodayOneMinute";
import CurrentPrice from "./CurrentPrice";
import { RecoilRoot } from "recoil";
import Button from "@/components/buttons/Button";
import { useTabScroll } from "@/lib/hooks/useTabScroll";
import MyStockInfo from "./MyStockInfo";
import { AmountStock } from "@/pages/model/AmountStock";
import { isEmpty } from "@/lib/util/util";

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
        <div className="flex flex-col gap-5 " ref={headerRef}>
          <CurrentPrice stockId={stockId} />
          <Section.Scroll>
            <Button onClick={handleScroll}>차트</Button>
            {!isEmpty(amountStock) && (
              <Button onClick={handleScroll}>내 주식</Button>
            )}
            <Button onClick={handleScroll}>종목정보</Button>
          </Section.Scroll>
        </div>
        <div tabIndex={0} ref={registryRef}>
          <Section title="차트(30분)">
            <TodayOneMinute stockId={stockId} />
          </Section>
        </div>
        {!isEmpty(amountStock) && (
          <div tabIndex={1} ref={registryRef}>
            <Section title="내 주식">
              <MyStockInfo amountStock={amountStock} />
            </Section>
          </div>
        )}
      </div>
    </RecoilRoot>
  );
};

export default ClientContainer;
