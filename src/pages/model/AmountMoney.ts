export class AmountMoney {
  accountNumber: number;

  krw: number;
  usd: number;

  constructor(data: any) {
    this.accountNumber = data.account_number;
    this.krw = data.krw;
    this.usd = data.usd;
  }
}
