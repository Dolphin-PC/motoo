"use client";

import Section from "@/components/section/Section";
import React, { useEffect, useState } from "react";
import { searchTextState } from "../atom";
import { useRecoilValue } from "recoil";
import { StockInfo } from "@/model/StockInfo";
import { fetchHelperWithData } from "@/lib/api/helper";
import { StatusCode } from "@/pages/api";
import StockCard from "@/components/card/StockCard";

const SearchResult = () => {
  const searchText = useRecoilValue(searchTextState);

  const [stockList, setStockList] = useState<StockInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchStockList = async () => {
    setIsLoading(true);
    const res = await fetchHelperWithData<string, StockInfo[]>({
      method: "GET",
      url: "/api/stock/list?search=" + searchText,
      options: {
        cache: "force-cache",
      },
    });

    if (res.status === StatusCode.SUCCESS) {
      if (res.body) {
        setStockList(res.body);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStockList();
  }, [searchText]);

  const StockCardList = ({
    isLoading,
    stockList,
  }: {
    isLoading: boolean;
    stockList: StockInfo[];
  }) => {
    if (isLoading) return <div>로딩 중...</div>;
    if (stockList.length == 0) return <div>검색 결과가 없습니다.</div>;

    return (
      <div>
        {stockList.map((stock, idx) => {
          return <StockCard key={idx} stock={stock} />;
        })}
      </div>
    );
  };

  return (
    <Section title="주식" className="flex flex-col gap-2">
      <StockCardList isLoading={isLoading} stockList={stockList} />
    </Section>
  );
};

export default SearchResult;
