import { AmountMoney } from "@prisma/client";
import { Notice } from "./Notice";
import { StockOrderHistory } from "./StockOrderHistory";
import { AmountStock } from "./AmountStock";
import { LikeStock } from "./LikeStock";
import { BaseModel } from "./Base";

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
  id?: number;

  @IsNumberString()
  @MinLength(10, {
    groups: [AccountInfoValidatorGroups.new, AccountInfoValidatorGroups.verify],
  })
  accountNumber: string;

  @IsBoolean({ groups: [AccountInfoValidatorGroups.edit] })
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
    let a = new AccountInfo();

    data = convertObjectPropertiesSnakeCaseToCamelCase(data);

    a.id = data.id;

    a.accountNumber = data.accountNumber;
    a.defaultAccountYn = data.defaultAccountYn;
    a.accountExpiredAt = data.accountExpiredAt;

    a.appKey = data.appKey;
    a.appSecret = data.appSecret;
    a.apiToken = data.apiToken;
    a.apiTokenExpiredAt = data.apiTokenExpiredAt;

    a.noticeList = data?.notice;
    a.stockOrderHistoryList = data?.stockOrderHistoryList;
    a.amountMoneyList = data?.amountMoneyList;
    a.amountStockList = data?.amountStockList;
    a.likeStockList = data?.likeStockList;

    return a;
  }
}
