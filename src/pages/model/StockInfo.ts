// # 주식정보
class StockInfo {
  stockId: number;
  type: String;
  name: String;
  imgSrc?: String;

  constructor(data: any) {
    this.stockId = data.stockId;
    this.type = data.type;
    this.name = data.name;
    this.imgSrc = data.imgSrc;
  }

  fromFirebase(data: any): StockInfo {
    return new StockInfo(data);
  }
}
