import InnerLayout from "@/components/layout/InnerLayout";
import { StockInfo } from "@/model/StockInfo";
import React from "react";
import DailyConclusion from "./DailyConclusion/DailyConclusion";
import RecoilContainer from "@/components/container/RecoilContainer";

type TProps = {
  params: { stockId: string };
  searchParams: { orderNo: string };
};

const StockHistoryPage = async (props: TProps) => {
  const { stockId } = props.params;
  const { orderNo } = props.searchParams;

  console.log("orderNo", orderNo);

  const stockInfo = await StockInfo.findUnique({
    stockId,
  });

  return (
    <InnerLayout title={stockInfo.name}>
      <RecoilContainer>
        <DailyConclusion stockId={stockId} orderNo={orderNo} />
      </RecoilContainer>
    </InnerLayout>
  );
};

export default StockHistoryPage;
