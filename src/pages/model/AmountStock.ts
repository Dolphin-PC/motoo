import { BaseModel } from "./Base";

// 보유주식
export class AmountStock extends BaseModel {
  accountNumber: number;
  stockId: string;

  constructor(data: any) {
    data = super(data);
    this.accountNumber = data.account_number;
    this.stockId = data.stock_id;
  }
}
