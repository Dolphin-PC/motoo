import { BaseModel } from "./Base";

// # 주식정보
export class StockInfo extends BaseModel {
  stockId: string;
  type: String;
  name: String;
  imgSrc?: String;

  price?: number;
  priceUpdateAt?: Date;

  constructor(data: any) {
    data = super(data);
    this.stockId = data.stockId;
    this.type = data.type;
    this.name = data.name;
    this.imgSrc = data.imgSrc;

    this.price = data.price;
    this.priceUpdateAt = data.priceUpdateAt;
  }

  static from(data: any) {
    return new StockInfo(data);
  }
}
