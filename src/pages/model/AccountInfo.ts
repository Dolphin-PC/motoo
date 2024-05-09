import { AmountMoney } from "@prisma/client";
import { Notice } from "./Notice";
import { StockOrderHistory } from "./StockOrderHistory";
import { AmountStock } from "./AmountStock";
import { LikeStock } from "./LikeStock";

// 사용자 토큰 정보
export class AccountInfo {
  id: number;

  accountNumber: number;
  defaultAccountYn: boolean;
  accountExpiredAt?: Date;

  appKey: string;
  appSecret: string;
  apiToken?: string;
  apiTokenExpiredAt?: Date;

  noticeList?: Notice[];
  stockOrderHistoryList?: StockOrderHistory[];
  amountMoneyList?: AmountMoney[];
  amountStockList?: AmountStock[];
  likeStockList?: LikeStock[];

  constructor(data: any) {
    this.id = data.id;

    this.accountNumber = data.account_number;
    this.defaultAccountYn = data.default_account_yn;
    this.accountExpiredAt = data.account_expired_at;

    this.appKey = data.app_key;
    this.appSecret = data.app_secret;
    this.apiToken = data.api_token;
    this.apiTokenExpiredAt = data.api_token_expired_at;

    this.noticeList = data?.notice;
    this.stockOrderHistoryList = data?.stock_order_history;
    this.amountMoneyList = data?.amount_money;
    this.amountStockList = data?.amount_stock;
    this.likeStockList = data?.like_stock;
  }
}
