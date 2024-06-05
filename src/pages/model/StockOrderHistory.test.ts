import { Prisma } from "@prisma/client";
import { OrderStatus, OrderType, StockOrderHistory } from "./StockOrderHistory";

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

  it("create", async () => {
    // given

    // when
    const result = await StockOrderHistory.create({
      oderNo: "3",
      ooderNo: "3",
      accountNumber: process.env.TEST_ACCOUNT_NUMBER,
      stockId: "005930",
      orderType: OrderType.BUY,
      orderStatus: OrderStatus.PENDING,
      orderTime: "2024-01-01 00:00:00",
      orderPrice: 1000,
      orderQuantity: 5,
    });

    // then
    expect(result).toBeInstanceOf(StockOrderHistory);
    console.info(result);
  });

  it("update", async () => {
    // given

    // when
    const result = await StockOrderHistory.updateConclusion({
      oderNo: "3",
      conclusionTime: "2024-01-02 01:00:00",
      conclusionQuantity: 1,
      conclusionPrice: 110,
    });
    // then
    expect(result).toBeInstanceOf(StockOrderHistory);
    console.info(result);
  });
});
