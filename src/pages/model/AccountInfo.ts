import { AccountInfo as P_AccountInfo, Prisma } from "@prisma/client";

import {
  IsInt,
  IsDate,
  IsBoolean,
  MinLength,
  IsNumberString,
  validateOrReject,
  ValidationError,
  Length,
} from "class-validator";
import { prisma } from "@/pages/service/prismaClient";
import { BaseModel } from "./Base";
import {
  OpenApiService,
  TApprovalRes,
} from "../service/openapi/OpenApiService";
import { Notice } from "./Notice";
import { StockOrderHistory } from "./StockOrderHistory";
import { AmountMoney } from "./AmountMoney";
import { AmountStock } from "./AmountStock";
import { GroupLikeStock } from "./GroupLikeStock";

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
  @Length(8, 8, {
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

  approvalKey: string | null;

  htsId: string;

  noticeList?: Notice[];
  stockOrderHistoryList?: StockOrderHistory[];
  amountMoneyList?: AmountMoney[];
  amountStockList?: AmountStock[];
  groupLikeStockList?: GroupLikeStock[];
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
      account_number: this.accountNumber,
      user_id: this.userId,
      default_account_yn: this.defaultAccountYn ?? false,
      account_expired_at: this.accountExpiredAt,
      app_key: this.appKey,
      app_secret: this.appSecret,
      api_token: this.apiToken,
      api_token_expired_at: this.apiTokenExpiredAt,
      approval_key: this.approvalKey,
      hts_id: this.htsId,
    };
  }
  // methods //

  // statics //

  /**@desc 계좌 정보를 조회합니다.
   *
   * @param prm
   * @param { Prisma.AccountInfoWhereInput } prm.where - 조회 조건
   * @param { boolean} prm.isConfirm - 토큰 만료 확인 여부
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

    // 웹소켓 미존재시, 웹소켓 발급 후 저장
    if (!resAccountInfo.approvalKey) {
      const res = await OpenApiService.issueWebSocketApprovalKey({
        appKey: resAccountInfo.appKey,
        secretKey: resAccountInfo.appSecret,
      });

      await prisma.accountInfo.update({
        where: {
          account_number: resAccountInfo.accountNumber,
        },
        data: {
          approval_key: res.approval_key,
        },
      });

      resAccountInfo.approvalKey = res.approval_key;
    }

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
    htsId,
  }: {
    userId: AccountInfo["userId"];
    accountNumber: AccountInfo["accountNumber"];
    appKey: AccountInfo["appKey"];
    appSecret: AccountInfo["appSecret"];
    apiToken: AccountInfo["apiToken"];
    apiTokenExpiredAt: AccountInfo["apiTokenExpiredAt"];
    htsId: AccountInfo["htsId"];
  }): Promise<AccountInfo> {
    // 1. 이미 등록된 계좌인지 확인
    await AccountInfo.findFirst({
      where: { account_number: accountNumber },
      isConfirm: false,
    }).then((existsAccount) => {
      if (existsAccount) throw new Error("이미 등록된 계좌입니다.");
    });

    // 2. 계좌가 없다면, 기본계좌로 등록
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
      htsId: htsId,
    });

    // 필수값 검증
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
        // 연관테이블 AmountMoney생성
        await AmountMoney.newSave({
          accountNumber: accountInfo.account_number,
        });
        return accountInfo;
      });

    return new AccountInfo(newAccountInfo);
  }

  /** @desc 웹 소켓 접속키 발급 및 등록 */
  static async getApprovalKey({
    accountNumber,
  }: {
    accountNumber: AccountInfo["accountNumber"];
  }): Promise<TApprovalRes> {
    const accountInfo = await prisma.accountInfo.findUnique({
      where: {
        account_number: accountNumber,
      },
    });

    if (!accountInfo) throw new Error("계좌 정보가 없습니다.");
    if (accountInfo.approval_key)
      return { approval_key: accountInfo.approval_key };

    // 웹 소켓 발급
    const res = await OpenApiService.issueWebSocketApprovalKey({
      appKey: accountInfo.app_key,
      secretKey: accountInfo.app_secret,
    });

    await prisma.accountInfo.update({
      where: {
        account_number: accountNumber,
      },
      data: {
        approval_key: res.approval_key,
      },
    });

    return { approval_key: res.approval_key };
  }

  // statics //
}
