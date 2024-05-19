import { AccountInfo as P_AccountInfo, Prisma } from "@prisma/client";

import {
  IsInt,
  IsDate,
  IsBoolean,
  MinLength,
  IsNumberString,
  validateOrReject,
  ValidationError,
} from "class-validator";
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

  // methods //
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
  // methods //

  // statics //
  /**@desc 계좌 정보를 조회합니다.
   * @param where - 조회 조건
   * @param isConfirm - 토큰 만료 확인 여부
   * @returns
   */
  static async findFirst({
    where,
    isConfirm = true,
  }: {
    where: Prisma.AccountInfoWhereInput;
    isConfirm?: boolean;
  }): Promise<AccountInfo | null> {
    let accountInfo = await prisma.accountInfo.findFirst({ where });

    if (accountInfo == null) return null;

    const resAccountInfo = new AccountInfo(accountInfo);
    if (isConfirm) await resAccountInfo.confirmApiToken();

    return resAccountInfo;
  }

  /**@desc 사용자의 계좌목록 정보를 조회합니다.
   * @param param0
   * @returns
   */
  static async findMany({
    where,
  }: {
    where: Prisma.AccountInfoWhereInput;
  }): Promise<AccountInfo[]> {
    const accountInfoList = await prisma.accountInfo.findMany({ where });

    return accountInfoList.map((accountInfo) => new AccountInfo(accountInfo));
  }

  /**@desc 새로운 계좌를 등록합니다.
   * @param param0
   * @returns
   */
  static async create({
    userId,
    accountNumber,
    appKey,
    appSecret,
    apiToken,
    apiTokenExpiredAt,
  }: {
    userId: AccountInfo["userId"];
    accountNumber: AccountInfo["accountNumber"];
    appKey: AccountInfo["appKey"];
    appSecret: AccountInfo["appSecret"];
    apiToken: AccountInfo["apiToken"];
    apiTokenExpiredAt: AccountInfo["apiTokenExpiredAt"];
  }): Promise<AccountInfo> {
    await AccountInfo.findFirst({
      where: { account_number: accountNumber },
      isConfirm: false,
    }).then((existsAccount) => {
      if (existsAccount) throw new Error("이미 등록된 계좌입니다.");
    });

    let defaultAccountYn = await prisma.accountInfo
      .findMany({
        where: {
          user_id: userId,
        },
      })
      .then((accountListByUserId) => accountListByUserId.length == 0);

    const accountInfo = new AccountInfo({
      userId,
      accountNumber,
      appKey,
      appSecret,
      defaultAccountYn,
      apiToken: apiToken,
      apiTokenExpiredAt: apiTokenExpiredAt,
    });

    await validateOrReject(accountInfo, {
      groups: [AccountInfoValidatorGroups.new],
    }).catch((errors: ValidationError[]) => {
      throw errors[0];
    });

    const newAccountInfo = await prisma.accountInfo
      .create({
        data: accountInfo.toPrisma(),
      })
      .then(async (accountInfo) => {
        await AmountMoney.newSave(accountInfo.account_number);
        return accountInfo;
      });

    return new AccountInfo(newAccountInfo);
  }

  // statics //
}
