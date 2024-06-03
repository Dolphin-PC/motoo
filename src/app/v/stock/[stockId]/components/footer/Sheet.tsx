"use client";

import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { inquireDataState } from "../../atom";
import HogaChart from "./sheet/HogaChart";
import RealTimePrice from "./sheet/RealTimePrice";
import Section from "@/components/section/Section";
import OrderForm from "./sheet/OrderForm";

const Sheet = ({
  type,
  handleBuySellFn,
}: {
  type: "buy" | "sell";
  handleBuySellFn: Function;
}): ReactNode => {
  const inquireData = useRecoilValue(inquireDataState);

  return (
    <>
      <Section
        title="실시간 호가"
        className="flex-1 overflow-scroll hide-scrollbar"
      >
        <HogaChart />
      </Section>

      <Section title={inquireData?.output1.hts_kor_isnm} className="flex-1">
        <RealTimePrice />

        <OrderForm type={type} handleBuySellFn={handleBuySellFn} />
      </Section>
    </>
  );
};

export default Sheet;
