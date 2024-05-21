import React from "react";
import TabScroll from "./TabScroll";
import StockService from "@/pages/service/stock/StockService";
import useAccountInfo from "@/lib/hooks/useAccountInfo";

const LikeStockPage = async () => {
  const accountInfo = await useAccountInfo();
  const groupLikeStockList =
    await StockService.getGroupLikeStockInfoListByAccountNumber({
      accountNumber: accountInfo.accountNumber,
    });
  return (
    <>
      <TabScroll groupLikeStockList={groupLikeStockList} />
    </>
  );
};

export default LikeStockPage;
