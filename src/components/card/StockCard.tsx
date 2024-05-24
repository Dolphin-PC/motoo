import { StockInfo } from "@/pages/model/StockInfo";
import React from "react";
import Button from "../buttons/Button";
import { TLikeStockInfo } from "@/pages/service/stock/StockService";

type TStockCardProps = {
  stock: StockInfo | TLikeStockInfo;
};

const StockCard = (props: TStockCardProps) => {
  const { name, stockId } = props.stock;
  return (
    <Button.Link href={`/v/stock/${stockId}`} className="flex">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className={`p-2 bg-primary-200 rounded-lg`}>{stockId}</p>
          <p className="font-bold">{name}</p>
        </div>
      </div>
    </Button.Link>
  );
};

export default StockCard;
