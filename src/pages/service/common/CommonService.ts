type TTableName = "/v/main_likeStockList";

export type TTableHeaderInfo = {
  displayName: string;
  key: string;
  type: "string" | "img" | "number" | "Date";
  priority: number;
};
const CommonService = {
  getTableHeader: (tableName: TTableName): Record<string, TTableHeaderInfo> => {
    switch (tableName) {
      case "/v/main_likeStockList":
        return {
          imgSrc: {
            displayName: "",
            key: "imgSrc",
            type: "img",
            priority: 1,
          },
          name: {
            displayName: "종목명",
            key: "name",
            type: "string",
            priority: 2,
          },
          stockId: {
            displayName: "종목번호",
            key: "stockId",
            type: "string",
            priority: 3,
          },
          type: {
            displayName: "구분",
            key: "type",
            type: "string",
            priority: 4,
          },
        };
    }
  },
};

export default CommonService;
