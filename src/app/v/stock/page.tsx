"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

const StockPage = () => {
  return (
    <RecoilRoot>
      <div className="flex flex-col gap-5">
        <SearchInput />

        <SearchResult />
      </div>
    </RecoilRoot>
  );
};

export default StockPage;
