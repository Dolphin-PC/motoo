import { BaseModel } from "./Base";

export class LikeStock extends BaseModel {
  accountNumber: number;
  stockId: string;

  constructor(data: any) {
    data = super(data);
    this.accountNumber = data.account_number;
    this.stockId = data.stock_id;
  }
}
