import { BaseModel } from "./Base";
import { Length, MinLength } from "class-validator";
import { Prisma } from "@prisma/client";
import prisma from "../service/prismaClient";

export enum OrderStatus {
  PENDING,
  SUCCESS,
  FAIL,
}

export enum OrderType {
  BUY,
  SELL,
}

export class StockOrderHistory extends BaseModel {
  @Length(8, 8)
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

  /** @desc 주식 주문 내역을 가져옵니다.
   *
   * @param param0
   * @returns
   */
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
