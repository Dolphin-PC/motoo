"use client";

import Button from "@/components/buttons/Button";
import Section from "@/components/section/Section";
import { useTabScroll } from "@/lib/hooks/useTabScroll";
import { TGroupLikeStockInfo } from "@/pages/service/stock/StockService";
import React from "react";

const TabScroll = ({
  groupLikeStockList,
}: {
  groupLikeStockList: TGroupLikeStockInfo[];
}) => {
  const { registryRef, handleScroll, headerRef } = useTabScroll();

  const handleAdd = () => {
    alert("추가하기 버튼 클릭");
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="sticky top-0" ref={headerRef}>
        <Section.Scroll title="관심주식">
          <Button primary onClick={handleAdd}>
            +
          </Button>
          {groupLikeStockList.map((group, idx) => {
            return (
              <Button key={idx} tabIndex={idx} onClick={handleScroll}>
                {group.groupName}
              </Button>
            );
          })}
        </Section.Scroll>
      </div>
      {groupLikeStockList.map((group, idx) => {
        return (
          <div key={idx} tabIndex={idx} ref={registryRef}>
            <Section key={idx}>{group.groupName}</Section>
          </div>
        );
      })}
    </div>
  );
};

export default TabScroll;
