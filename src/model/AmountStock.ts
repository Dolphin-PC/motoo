import { Length } from "class-validator";
import { BaseModel } from "./Base";
import { prisma } from "@/service/prismaClient";
import { Prisma } from "@prisma/client";
import { AccountInfo } from "./AccountInfo";

export type TAmountStockUpsertInput = {
  stockId: AmountStock["stockId"];
  quantity: AmountStock["quantity"];
  avgAmount: AmountStock["avgAmount"];
};

// 보유주식
export class AmountStock extends BaseModel {
  id: number;

  stockId: string;
  @Length(8, 8)
  accountNumber: number;
  quantity: number;

  avgAmount: number;

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

  static async upsert({
    accountNumber,
    data,
  }: {
    accountNumber: AccountInfo["accountNumber"];
    data: TAmountStockUpsertInput;
  }): Promise<void> {
    await prisma.amountStock.upsert({
      where: {
        stock_id_account_number: {
          account_number: accountNumber,
          stock_id: data.stockId,
        },
      },
      update: {
        stock_id: data.stockId,
        quantity: data.quantity,
        avg_amount: data.avgAmount,
      },
      create: {
        account_number: accountNumber,
        stock_id: data.stockId,
        quantity: data.quantity,
        avg_amount: data.avgAmount,
      },
    });
  }

  // statics //
}
