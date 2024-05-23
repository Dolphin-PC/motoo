import { StockInfo } from "@/pages/model/StockInfo";
import React from "react";
import Button from "../buttons/Button";
import RightChevron from "@/assets/icons/chevron-right.svg";

type TStockCardProps = {
  stock: StockInfo;
};

const StockCard = (props: TStockCardProps) => {
  const { name, stockId } = props.stock;
  return (
    <Button className="flex">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className={`p-2 bg-primary-200 rounded-lg`}>{stockId}</p>
          <p className="font-bold">{name}</p>
        </div>
        <RightChevron />
      </div>
    </Button>
  );
};

export default StockCard;
