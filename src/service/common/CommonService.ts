import {
  TAmountStockInfo,
  TLikeStockInfo,
  TStockOrderHistoryInfo,
} from "../stock/StockService";
import { PartialRecord } from "@/lib/types/global";

export type TTableName =
  | "/v/main_likeStockList"
  | "/v/my-stock_stockOrderHistoryList"
  | "/v/portfolio_amountStockInfoList";

export type TTableHeaderInfo = {
  displayName: string;
  key: string;
  type: "string" | "img" | "number" | "Date" | "value" | "link";
  value?: any;
};

const CommonService = {
  getTableHeader: (tableName: TTableName): Record<string, TTableHeaderInfo> => {
    switch (tableName) {
      case "/v/main_likeStockList": {
        return {
          name: {
            displayName: "종목명",
            key: "name",
            type: "string",
          },
          stockId: {
            displayName: "종목번호",
            key: "stockId",
            type: "string",
          },
          type: {
            displayName: "구분",
            key: "type",
            type: "string",
          },
          price: {
            displayName: "현재가",
            key: "price",
            type: "number",
          },
        } as PartialRecord<keyof TLikeStockInfo, TTableHeaderInfo>;
      }
      case "/v/my-stock_stockOrderHistoryList": {
        const TableEnumDisplay = {
          orderType: ["매수", "매도"],
          orderStatus: ["대기", "완료", "실패"],
        };

        return {
          orderTime: {
            displayName: "주문일",
            key: "orderTime",
            type: "Date",
          },
          name: {
            displayName: "종목명",
            key: "name",
            type: "string",
          },
          orderType: {
            displayName: "구분",
            key: "orderType",
            type: "value",
            value: TableEnumDisplay.orderType,
          },
          orderPrice: {
            displayName: "주문가격",
            key: "orderPrice",
            type: "number",
          },
          conclusionPrice: {
            displayName: "체결가격",
            key: "conclusionPrice",
            type: "number",
          },
          orderQuantity: {
            displayName: "수량",
            key: "orderQuantity",
            type: "number",
          },
          orderTotal: {
            displayName: "주문금액",
            key: "orderTotal",
            type: "number",
          },
          conclusionTotal: {
            displayName: "체결금액",
            key: "conclusionTotal",
            type: "number",
          },
          orderStatus: {
            displayName: "상태",
            key: "orderStatus",
            type: "value",
            value: TableEnumDisplay.orderStatus,
          },
          link: {
            displayName: "",
            key: "link",
            type: "link",
            value: "/v/my-stock/stock-order-history",
          },
        } as PartialRecord<
          keyof TStockOrderHistoryInfo | "link",
          TTableHeaderInfo
        >;
      }
      case "/v/portfolio_amountStockInfoList": {
        return {
          name: {
            displayName: "종목명",
            key: "name",
            type: "string",
          },
          quantity: {
            displayName: "보유 주식 수",
            key: "quantity",
            type: "number",
          },

          price: {
            displayName: "현재가",
            key: "price",
            type: "number",
          },
        } as PartialRecord<keyof TAmountStockInfo, TTableHeaderInfo>;
      }
    }
  },
};

export default CommonService;
