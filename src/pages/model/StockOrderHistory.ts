import { BaseModel } from "./Base";
import { Length, MinLength } from "class-validator";
import { Prisma } from "@prisma/client";
import prisma from "../service/prismaClient";
import {
  convertObjectPropertiesCamelCaseToSnakeCase,
  getKoreanTime,
} from "@/lib/util/util";

export enum OrderStatus {
  PENDING,
  SUCCESS,
  FAIL,
}

export enum OrderType {
  BUY,
  SELL,
}

type TUpdateConclusion = {
  oderNo: string;
  conclusionTime: string;
  conclusionPrice: number;
  conclusionQuantity: number;
};

export class StockOrderHistory extends BaseModel {
  /** 주문번호 */
  oderNo: string;
  /** 원주문번호 */
  ooderNo: string;

  stockId: string;
  @Length(8, 8)
  accountNumber: string;

  orderType: OrderType;
  orderStatus: OrderStatus;
  orderTime?: string;
  orderPrice: number;
  orderQuantity: number;

  conclusionTime?: string;
  conclusionPrice?: number;
  conclusionQuantity?: number;

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

  static async findUnique(
    where: Prisma.StockOrderHistoryWhereUniqueInput
  ): Promise<StockOrderHistory | null> {
    const result = await prisma.stockOrderHistory.findUnique({ where });

    if (!result) return null;

    return new StockOrderHistory(result);
  }

  static async create(data: StockOrderHistory) {
    const result = await prisma.stockOrderHistory.create({
      data: {
        oder_no: data.oderNo,
        ooder_no: data.ooderNo,
        stock_id: data.stockId,
        account_number: data.accountNumber,
        order_type: data.orderType,
        order_status: data.orderStatus,
        order_time: data.orderTime,
        order_price: data.orderPrice,
        order_quantity: data.orderQuantity,
      },
    });

    return new StockOrderHistory(result);
  }

  static async update(
    where: Prisma.StockOrderHistoryWhereUniqueInput,
    data: Prisma.StockOrderHistoryUpdateInput
  ): Promise<StockOrderHistory> {
    const result = await prisma.stockOrderHistory.update({
      where,
      data,
    });

    return new StockOrderHistory(result);
  }

  /** @desc 체결상태 업데이트
   * 일부체결될 수
   * @param data
   * @returns
   */
  static async updateConclusion(
    data: TUpdateConclusion
  ): Promise<StockOrderHistory> {
    const orgStockOrderHistory = await this.findUnique({
      oder_no: data.oderNo,
    });
    if (!orgStockOrderHistory) throw new Error("주문내역이 존재하지 않습니다.");

    const orderStatus =
      orgStockOrderHistory.orderQuantity ===
      (orgStockOrderHistory.conclusionQuantity || 0) + data.conclusionQuantity
        ? OrderStatus.SUCCESS
        : OrderStatus.PENDING;
    const conclusionQuantity =
      (orgStockOrderHistory.conclusionQuantity || 0) + data.conclusionQuantity;
    const conclusionPriceSum =
      (orgStockOrderHistory.conclusionPrice || 0) *
        (orgStockOrderHistory.conclusionQuantity || 0) +
      data.conclusionPrice * data.conclusionQuantity;

    const res = await this.update(
      {
        oder_no: data.oderNo,
      },
      {
        order_status: orderStatus,
        conclusion_quantity: conclusionQuantity,
        conclusion_price: Math.floor(conclusionPriceSum / conclusionQuantity),
        conclusion_time: data.conclusionTime,
      }
    );

    return new StockOrderHistory(res);
  }
  // statics //
}
