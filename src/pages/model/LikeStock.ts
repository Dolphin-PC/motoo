class LikeStock {
  stockList: StockInfo;

  constructor(data: any) {
    this.stockList = data.stockList;
  }

  fromFirebase(data: any): LikeStock {
    return new LikeStock(data);
  }
}
