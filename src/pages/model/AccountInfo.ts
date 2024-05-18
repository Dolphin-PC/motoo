import { AccountInfo as P_AccountInfo, Prisma } from "@prisma/client";

import {
  IsInt,
  IsDate,
  IsBoolean,
  MinLength,
  IsNumberString,
} from "class-validator";
import { convertObjectPropertiesSnakeCaseToCamelCase } from "@/lib/util/util";
import { prisma } from "@/pages/service/prismaClient";
import { BaseModel } from "./Base";
import { OpenApiService } from "../service/openapi/OpenApiService";
import { Notice } from "./Notice";
import { StockOrderHistory } from "./StockOrderHistory";
import { AmountMoney } from "./AmountMoney";
import { AmountStock } from "./AmountStock";
import { LikeStock } from "./LikeStock";

export enum AccountInfoValidatorGroups {
  verify = "VERIFY_ACCOUNT",
  new = "NEW_ACCOUNT",
  edit = "EDIT_ACCOUNT",
}

// 사용자 토큰 정보
export class AccountInfo extends BaseModel {
  // properties //
  @IsInt({ groups: [AccountInfoValidatorGroups.new] })
  userId: number;

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
  apiToken: string | null;
  apiTokenExpiredAt: Date | null;

  noticeList?: Notice[];
  stockOrderHistoryList?: StockOrderHistory[];
  amountMoneyList?: AmountMoney[];
  amountStockList?: AmountStock[];
  likeStockList?: LikeStock[];
  // properties //

  constructor(data: any) {
    super(data);
  }

  static async findFirst(
    where: Prisma.AccountInfoWhereInput
  ): Promise<AccountInfo | null> {
    let accountInfo = await prisma.accountInfo.findFirst({ where });

    if (accountInfo == null) return null;

    const resAccountInfo = new AccountInfo(accountInfo);
    await resAccountInfo.confirmApiToken();

    return resAccountInfo;
  }

  /** @desc API 토큰만료 확인 및 재발급
   *
   */
  async confirmApiToken(): Promise<void> {
    if (
      !this.apiToken ||
      !this.apiTokenExpiredAt ||
      this.apiTokenExpiredAt < new Date()
    ) {
      const res = await OpenApiService.issueApiToken({
        accountNumber: this.accountNumber,
        appKey: this.appKey,
        appSecret: this.appSecret,
      });

      await prisma.accountInfo.update({
        where: {
          account_number: this.accountNumber,
        },
        data: {
          api_token: res.access_token,
          api_token_expired_at: res.access_token_token_expired,
        },
      });

      this.apiToken = res.access_token;
      this.apiTokenExpiredAt = res.access_token_token_expired;
    }
  }

  toPrisma(): P_AccountInfo {
    return {
      user_id: this.userId,
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
