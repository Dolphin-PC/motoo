import { OrderStatus, OrderType } from "./enum";
import { BaseModel } from "./Base";
import { MinLength } from "class-validator";
import { Prisma } from "@prisma/client";
import prisma from "../service/prismaClient";

export class StockOrderHistory extends BaseModel {
  @MinLength(10)
  accountNumber: number;
  stockId: string;

  orderType: OrderType;
  orderStatus: OrderStatus;
  orderTime: Date;
  conclusionTime?: Date;

  orderPrice: number;
  orderQuantity: number;
  conclusionPrice?: number;

  constructor(data: any) {
    super(data);
  }

  // statics //
  static async findMany({
    where,
  }: {
    where: Prisma.StockOrderHistoryWhereInput;
  }) {
    const result = await prisma.stockOrderHistory
      .findMany({ where })
      .then((res) => res.map((history) => new StockOrderHistory(history)));

    return result;
  }
  // statics //
}
