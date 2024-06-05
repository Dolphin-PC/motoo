import InnerLayout from "@/components/layout/InnerLayout";
import { StockInfo } from "@/pages/model/StockInfo";
import React from "react";
import DailyConclusion from "./components/DailyConclusion";

type TProps = {
  params: { stockId: string };
};

const StockHistoryPage = async (props: TProps) => {
  const { stockId } = props.params;

  const stockInfo = await StockInfo.findUnique({
    stockId,
  });

  return (
    <InnerLayout title={stockInfo.name}>
      <DailyConclusion stockId={stockId} />
    </InnerLayout>
  );
};

export default StockHistoryPage;
