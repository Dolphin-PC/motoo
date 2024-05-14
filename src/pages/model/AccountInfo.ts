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
  IsDefined,
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
  @IsInt({ groups: [AccountInfoValidatorGroups.new] })
  user_id: number;

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
  accountExpiredAt: Date | null;

  @MinLength(10, {
    groups: [AccountInfoValidatorGroups.new, AccountInfoValidatorGroups.verify],
  })
  appKey: string;

  @MinLength(10, {
    groups: [AccountInfoValidatorGroups.new, AccountInfoValidatorGroups.verify],
  })
  appSecret: string;

  // @IsDefined({ groups: [AccountInfoValidatorGroups.new] })
  apiToken: string | null;
  // @IsDefined({ groups: [AccountInfoValidatorGroups.new] })
  apiTokenExpiredAt: Date | null;

  noticeList?: Notice[];
  stockOrderHistoryList?: StockOrderHistory[];
  amountMoneyList?: AmountMoney[];
  amountStockList?: AmountStock[];
  likeStockList?: LikeStock[];

  constructor() {}

  static from(data: any) {
    let o = new AccountInfo();

    data = convertObjectPropertiesSnakeCaseToCamelCase(data);

    o.user_id = data.id;

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

  toPrisma(): P_AccountInfo {
    return {
      user_id: this.user_id,
      account_number: this.accountNumber,
      default_account_yn: this.defaultAccountYn ?? false,
      account_expired_at: this.accountExpiredAt,
      app_key: this.appKey,
      app_secret: this.appSecret,
      api_token: this.apiToken,
      api_token_expired_at: this.apiTokenExpiredAt,
    };
  }
}
