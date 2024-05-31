import React from "react";
import StockService from "@/pages/service/stock/StockService";
import useAccountInfo from "@/lib/hooks/useAccountInfo";
import RecoilContainer from "@/components/container/RecoilContainer";
import TabScroll from "./TabScroll";

const LikeStockPage = async () => {
  const accountInfo = await useAccountInfo();
  const groupLikeStockList =
    await StockService.getGroupLikeStockInfoListByAccountNumber({
      accountNumber: accountInfo.accountNumber,
    });
  return (
    <RecoilContainer>
      <TabScroll groupLikeStockList={groupLikeStockList} />
    </RecoilContainer>
  );
};

export default LikeStockPage;
