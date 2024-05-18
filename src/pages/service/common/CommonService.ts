type TTableName = "/v/main_likeStockList";

export type TTableHeaderInfo = {
  displayName: string;
  key: string;
  type: "string" | "img" | "number" | "Date";
};
const CommonService = {
  getTableHeader: (tableName: TTableName): Record<string, TTableHeaderInfo> => {
    switch (tableName) {
      case "/v/main_likeStockList":
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
        };
    }
  },
};

export default CommonService;
