import { MinLength } from "class-validator";
import { BaseModel } from "./Base";

// 보유주식
export class AmountStock extends BaseModel {
  id: number;

  stockId: string;
  @MinLength(10)
  accountNumber: number;
  quantity: number;

  price: number;
  priceUpdateAt: Date;

  constructor(data: any) {
    data = super(data);

    this.id = data.id;
    this.accountNumber = data.accountNumber;
    this.stockId = data.stockId;
    this.quantity = data.quantity;
  }

  static from(data: any) {
    return new AmountStock(data);
  }
}
