"use client";
import React from "react";
import TabScroll from "./TabScroll";
import { TGroupLikeStockInfo } from "@/pages/service/stock/StockService";
import { RecoilRoot } from "recoil";

// XXX Recoil을 사용하기 위해서는 Container로 하는 수밖에 없나...
const TabScrollContainer = ({
  groupLikeStockList,
}: {
  groupLikeStockList: TGroupLikeStockInfo[];
}) => {
  return (
    <RecoilRoot>
      <TabScroll groupLikeStockList={groupLikeStockList} />
    </RecoilRoot>
  );
};

export default TabScrollContainer;
