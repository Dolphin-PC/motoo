import { AmountMoney, AccountInfo as P_AccountInfo } from "@prisma/client";
import { Notice } from "./Notice";
import { StockOrderHistory } from "./StockOrderHistory";
import { AmountStock } from "./AmountStock";
import { LikeStock } from "./LikeStock";

import {
  IsInt,
  Length,
  IsDate,
  IsBoolean,
  MinLength,
  IsEnum,
  ValidateIf,
  IsNumber,
  Min,
  IsNumberString,
} from "class-validator";
import { verify } from "crypto";
import { convertObjectPropertiesSnakeCaseToCamelCase } from "@/lib/util/util";

export enum AccountInfoValidatorGroups {
  verify = "VERIFY_ACCOUNT",
  new = "NEW_ACCOUNT",
  edit = "EDIT_ACCOUNT",
}

// 사용자 토큰 정보
export class AccountInfo {
  @IsInt({ always: true })
  id: number;

  @IsNumberString()
  @MinLength(10, {
    groups: [AccountInfoValidatorGroups.new, AccountInfoValidatorGroups.verify],
  })
  accountNumber: string;

  @IsBoolean({
    groups: [AccountInfoValidatorGroups.new, AccountInfoValidatorGroups.edit],
  })
  defaultAccountYn: boolean;

  @IsDate()
  accountExpiredAt?: Date;

  @MinLength(10, {
    groups: [AccountInfoValidatorGroups.new, AccountInfoValidatorGroups.verify],
  })
  appKey: string;

  @MinLength(10, {
    groups: [AccountInfoValidatorGroups.new, AccountInfoValidatorGroups.verify],
  })
  appSecret: string;

  apiToken?: string;
  apiTokenExpiredAt?: Date;

  noticeList?: Notice[];
  stockOrderHistoryList?: StockOrderHistory[];
  amountMoneyList?: AmountMoney[];
  amountStockList?: AmountStock[];
  likeStockList?: LikeStock[];

  constructor() {}

  static from(data: any) {
    let o = new AccountInfo();

    data = convertObjectPropertiesSnakeCaseToCamelCase(data);

    o.id = data.id;

    o.accountNumber = data.accountNumber;
    o.defaultAccountYn = data.defaultAccountYn;
    o.accountExpiredAt = data.accountExpiredAt;

    o.appKey = data.appKey;
    o.appSecret = data.appSecret;
    o.apiToken = data.apiToken;
    o.apiTokenExpiredAt = data.apiTokenExpiredAt;

    o.noticeList = data?.notice;
    o.stockOrderHistoryList = data?.stockOrderHistoryList;
    o.amountMoneyList = data?.amountMoneyList;
    o.amountStockList = data?.amountStockList;
    o.likeStockList = data?.likeStockList;

    return o;
  }

  toPrisma() {
    return {
      id: this.id,
      account_number: +this.accountNumber,
      default_account_yn: this.defaultAccountYn,
      account_expired_at: this.accountExpiredAt ?? null,
      app_key: this.appKey,
      app_secret: this.appSecret,
      api_token: this.apiToken ?? null,
      api_token_expired_at: this.apiTokenExpiredAt ?? null,
    };
  }
}
