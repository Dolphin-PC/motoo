import { MinLength } from "class-validator";
import { BaseModel } from "./Base";

// 보유주식
export class AmountStock extends BaseModel {
  @MinLength(10)
  accountNumber: number;
  stockId: string;

  constructor(data: any) {
    data = super(data);
    this.accountNumber = data.account_number;
    this.stockId = data.stock_id;
  }
}
