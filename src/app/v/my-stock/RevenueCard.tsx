"use client";
import Button from "@/components/buttons/Button";
import React from "react";
import LeftChevron from "@/assets/icons/chevron-left.svg";
import RightChevron from "@/assets/icons/chevron-right.svg";

const RevenueCard = () => {
  return (
    <div>
      <div className="flex items-center">
        <Button>
          <LeftChevron />
        </Button>
        <p>3월 판매수익</p>
        <Button>
          <RightChevron />
        </Button>
      </div>
      <div className="flex gap-2 font-bold text-2xl items-baseline">
        <span>₩</span>
        <div>
          <span>+</span>
          <span>1,500,000</span>
        </div>
        <span className="rounded-xl bg-info-500 text-white p-1 text-sm">
          +5.3%
        </span>
      </div>
    </div>
  );
};

export default RevenueCard;
