import { AmountMoney } from "@prisma/client";
import { Notice } from "./Notice";
import { StockOrderHistory } from "./StockOrderHistory";
import { AmountStock } from "./AmountStock";
import { LikeStock } from "./LikeStock";
import { BaseModel } from "./Base";

import { IsInt, Length, IsDate, IsBoolean, MinLength } from "class-validator";

// 사용자 토큰 정보
export class AccountInfo extends BaseModel {
  id?: number;

  @MinLength(10)
  accountNumber: number;

  @IsBoolean()
  defaultAccountYn: boolean;

  @IsDate()
  accountExpiredAt?: Date;

  @MinLength(10)
  appKey: string;
  @MinLength(10)
  appSecret: string;
  @MinLength(10)
  apiToken?: string;
  @IsDate()
  apiTokenExpiredAt?: Date;

  noticeList?: Notice[];
  stockOrderHistoryList?: StockOrderHistory[];
  amountMoneyList?: AmountMoney[];
  amountStockList?: AmountStock[];
  likeStockList?: LikeStock[];

  constructor(data: any) {
    data = super(data);

    this.id = data.id;

    this.accountNumber = data.accountNumber;
    this.defaultAccountYn = data.defaultAccountYn;
    this.accountExpiredAt = data.accountExpiredAt;

    this.appKey = data.appKey;
    this.appSecret = data.appSecret;
    this.apiToken = data.apiToken;
    this.apiTokenExpiredAt = data.apiTokenExpiredAt;

    this.noticeList = data?.notice;
    this.stockOrderHistoryList = data?.stockOrderHistoryList;
    this.amountMoneyList = data?.amountMoneyList;
    this.amountStockList = data?.amountStockList;
    this.likeStockList = data?.likeStockList;
  }
}
