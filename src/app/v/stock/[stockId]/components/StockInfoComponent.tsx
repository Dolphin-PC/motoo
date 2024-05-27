import React from "react";
import { useRecoilValue } from "recoil";
import { inquireDataState } from "../atom";
import { stringToNumberLocale } from "@/lib/util/util";
import Card from "@/components/card/Card";

type TProps = {
  stockId: string;
};

const StockInfoComponent = (props: TProps) => {
  const { stockId } = props;

  const inquireData = useRecoilValue(inquireDataState);

  if (inquireData?.output1 == null) return <div>Loading...</div>;
  const { stck_prdy_clpr, acml_vol, acml_tr_pbmn } = inquireData.output1;
  return (
    <div className="mt-3 flex flex-col gap-3">
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
    </div>
  );
};

export default StockInfoComponent;
