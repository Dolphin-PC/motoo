import React from "react";
import { useRecoilValue } from "recoil";
import { inquireDataState } from "../atom";
import { stringToNumberLocale } from "@/lib/util/util";
import Card from "@/components/card/Card";
import Section from "@/components/section/Section";
import NotData from "@/components/icon/NotData";

const StockInfoComponent = () => {
  const inquireData = useRecoilValue(inquireDataState);

  if (inquireData == null) return <NotData />;
  const { stck_prdy_clpr, acml_vol, acml_tr_pbmn } = inquireData.output1;

  return (
    <Section title="시세" className="mt-3 flex flex-col gap-3">
      <Card.Text
        label="전일종가"
        content={stringToNumberLocale(stck_prdy_clpr) + "원"}
      />
      <Card.Text
        label="누적거래량"
        content={stringToNumberLocale(acml_vol, true) + "주"}
      />
      <Card.Text
        label="누적거래대금"
        content={stringToNumberLocale(acml_tr_pbmn, true) + "원"}
      />
    </Section>
  );
};

export default StockInfoComponent;
