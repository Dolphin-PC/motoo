// # 주식정보
export class StockInfo {
  stockId: number;
  type: String;
  name: String;
  imgSrc?: String;

  constructor(data: any) {
    this.stockId = data.stock_id;
    this.type = data.type;
    this.name = data.name;
    this.imgSrc = data.img_src;
  }
}
