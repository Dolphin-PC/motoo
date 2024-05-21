import React from "react";
import StockService from "@/pages/service/stock/StockService";
import useAccountInfo from "@/lib/hooks/useAccountInfo";
import TabScrollContainer from "./TabScrollContainer";

const LikeStockPage = async () => {
  const accountInfo = await useAccountInfo();
  const groupLikeStockList =
    await StockService.getGroupLikeStockInfoListByAccountNumber({
      accountNumber: accountInfo.accountNumber,
    });
  return (
    <>
      <TabScrollContainer groupLikeStockList={groupLikeStockList} />
    </>
  );
};

export default LikeStockPage;
