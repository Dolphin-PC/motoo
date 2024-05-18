import { OrderStatus, OrderType } from "./enum";
import { BaseModel } from "./Base";
import { MinLength } from "class-validator";

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
    data = super(data);

    this.accountNumber = data.accountNumber;
    this.stockId = data.stockId;

    this.orderType = data.orderType;
    this.orderStatus = data.orderStatus;
    this.orderTime = data.orderTime;
    this.conclusionTime = data.conclusionTime;

    this.orderPrice = data.orderPrice;
    this.orderQuantity = data.orderQuantity;
    this.conclusionPrice = data.conclusionPrice;
  }

  static from(data: any) {
    return new StockOrderHistory(data);
  }
}
