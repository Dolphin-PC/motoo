import { BaseModel } from "./Base";

export class AmountMoney extends BaseModel {
  accountNumber: number;

  krw: number;
  usd: number;

  constructor(data: any) {
    data = super(data);
    this.accountNumber = data.account_number;
    this.krw = data.krw;
    this.usd = data.usd;
  }
}
