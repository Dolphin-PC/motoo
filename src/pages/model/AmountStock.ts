import { MinLength } from "class-validator";
import { BaseModel } from "./Base";
import { prisma } from "@/pages/service/prismaClient";
import { Prisma } from "@prisma/client";

// 보유주식
export class AmountStock extends BaseModel {
  id: number;

  stockId: string;
  @MinLength(10)
  accountNumber: number;
  quantity: number;

  // historyId: number;

  constructor(data: any) {
    super(data);
  }

  // statics //
  static async findMany({
    where,
  }: {
    where: Prisma.AmountStockWhereInput;
  }): Promise<AmountStock[]> {
    const result = await prisma.amountStock
      .findMany({ where })
      .then((res) => res.map((stock) => new AmountStock(stock)));

    return result;
  }

  static async findUnique({
    where,
  }: {
    where: Prisma.AmountStockWhereUniqueInput;
  }) {
    const result = await prisma.amountStock
      .findUnique({ where })
      .then((stock) => new AmountStock(stock));

    return result;
  }

  // statics //
}
