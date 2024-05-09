import { OrderStatus, OrderType } from "./enum";

export class StockOrderHistory {
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
