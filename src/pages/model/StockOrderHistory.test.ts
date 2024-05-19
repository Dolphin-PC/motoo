import { Prisma } from "@prisma/client";
import { StockOrderHistory } from "./StockOrderHistory";

describe("StockOrderHistory", () => {
  it("findMany", async () => {
    // given
    const where: Prisma.StockOrderHistoryWhereInput = {
      account_number: "333333333333",
    };

    // when
    const result = await StockOrderHistory.findMany({ where });

    // then
    expect(Array.isArray(result)).toBe(true);

    result.forEach((item) => {
      expect(item).toBeInstanceOf(StockOrderHistory);
    });
    console.info(result);
  });
});
