import StockService from "@/service/stock/StockService";

describe("stock.test.ts", () => {
  it("GET", async () => {
    try {
      const accountNumber = "333333333333";

      const stockInfoList = await StockService.getAmountStockInfoList({
        accountNumber: accountNumber,
      });

      console.info(stockInfoList);
    } catch (error) {
      console.error(error);
    }
  });
});
