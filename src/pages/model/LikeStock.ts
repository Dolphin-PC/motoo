export class LikeStock {
  accountNumber: number;
  stockId: string;

  constructor(data: any) {
    this.accountNumber = data.account_number;
    this.stockId = data.stock_id;
  }
}
