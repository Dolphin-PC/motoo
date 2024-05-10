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
} from "class-validator";
import { verify } from "crypto";
import { convertObjectPropertiesSnakeCaseToCamelCase } from "@/lib/util/util";

export enum EAccountType {
  VERIFY_ACCOUNT, // 계좌 인증
}

const validateIf = {
  verifyAccount: (o: AccountInfo) => o.type !== EAccountType.VERIFY_ACCOUNT,
};

// 사용자 토큰 정보
export class AccountInfo {
  @IsEnum(EAccountType, {
    message: "AccountType is not valid",
  })
  type: EAccountType;

  id?: number;

  @MinLength(10)
  accountNumber: string;

  @ValidateIf(validateIf.verifyAccount)
  @IsBoolean()
  defaultAccountYn: boolean;

  @ValidateIf(validateIf.verifyAccount)
  @IsDate()
  accountExpiredAt?: Date;

  @MinLength(10)
  appKey: string;

  @MinLength(10)
  appSecret: string;

  @ValidateIf(validateIf.verifyAccount)
  @MinLength(10)
  apiToken?: string;

  @ValidateIf(validateIf.verifyAccount)
  @IsDate()
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
