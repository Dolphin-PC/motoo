import { MinLength } from "class-validator";
import { BaseModel } from "./Base";

export class LikeStock extends BaseModel {
  @MinLength(10)
  accountNumber: number;
  stockId: string;

  constructor(data: any) {
    data = super(data);
    this.accountNumber = data.accountNumber;
    this.stockId = data.stockId;
  }

  static from(data: any) {
    return new LikeStock(data);
  }
}
