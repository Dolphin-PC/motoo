import { AccountService } from "@/pages/service/account/AccountService";
import StockService from "@/pages/service/stock/StockService";
import { ResInvalid, ResOk } from "..";

describe("stock.test.ts", () => {
  it("GET", async () => {
    try {
      const id = 1;
      const accountNumber = "333333333333";

      const stockInfoList = await StockService.getStockList({
        accountNumber: accountNumber,
      });

      console.info(stockInfoList);
    } catch (error) {
      console.error(error);
    }
  });
});
