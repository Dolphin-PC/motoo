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

    this.accountNumber = data.account_number;
    this.stockId = data.stock_id;

    this.orderType = data.order_type;
    this.orderStatus = data.order_status;
    this.orderTime = data.order_time;
    this.conclusionTime = data.conclusion_time;

    this.orderPrice = data.order_price;
    this.orderQuantity = data.order_quantity;
    this.conclusionPrice = data.conclusion_price;
  }
}
