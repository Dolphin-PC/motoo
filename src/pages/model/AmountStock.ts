// 보유주식
class AmountStock {
  stockInfo: StockInfo;

  constructor(data: any) {
    this.stockInfo = data.stockInfo;
  }

  fromFirebase(data: any): AmountStock {
    return new AmountStock(data);
  }
}
