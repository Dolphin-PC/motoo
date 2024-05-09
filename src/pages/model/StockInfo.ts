import { BaseModel } from "./Base";

// # 주식정보
export class StockInfo extends BaseModel {
  stockId: number;
  type: String;
  name: String;
  imgSrc?: String;

  constructor(data: any) {
    data = super(data);
    this.stockId = data.stock_id;
    this.type = data.type;
    this.name = data.name;
    this.imgSrc = data.img_src;
  }
}
