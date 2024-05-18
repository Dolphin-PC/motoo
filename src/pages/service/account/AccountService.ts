import {
  AccountInfo,
  AccountInfoValidatorGroups,
} from "@/pages/model/AccountInfo";
import { prisma } from "../prismaClient";
import { ValidationError, validateOrReject } from "class-validator";
import { AmountStock } from "@/pages/model/AmountStock";
import { TgetStockPriceReq, getStockPrice } from "../openapi/OpenApiService";

/** @desc 새로운 계좌를 등록합니다.
 *
 * @param accountInfo
 * @returns
 */
export const saveNewAccount = async (
  accountInfo: AccountInfo
): Promise<AccountInfo> => {
  await validateOrReject(accountInfo, {
    groups: [AccountInfoValidatorGroups.new],
  }).catch((errors: ValidationError[]) => {
    throw errors[0];
  });

  const existsAccount = await getAccountInfo(accountInfo.accountNumber);
  if (existsAccount) {
    throw new Error("이미 등록된 계좌입니다.");
  }

  const accountListByUserId = await prisma.accountInfo.findMany({
    where: {
      user_id: accountInfo.userId,
    },
  });

  if (accountListByUserId.length == 0) accountInfo.defaultAccountYn = true;

  const [newAccountInfo] = await prisma.$transaction([
    prisma.accountInfo.create({ data: accountInfo.toPrisma() }),
    prisma.amountMoney.create({
      data: { account_number: accountInfo.accountNumber, krw: 0, usd: 0 },
    }),
  ]);

  return AccountInfo.from(newAccountInfo);
};

/** @desc 계좌 정보를 조회합니다.
 *
 * @param accountNumber
 * @returns
 */
export const getAccountInfo = async (
  accountNumber: string
): Promise<AccountInfo | null> => {
  const accountInfo = await prisma.accountInfo.findFirst({
    where: {
      account_number: accountNumber,
    },
  });

  if (accountInfo == null) return null;

  // TODO accountInfo의 토큰이 없거나, 토큰 만료가 되었을 경우, 토큰 재발급 로직 추가 필요

  return AccountInfo.from(accountInfo);
};

/** @desc 사용자의 계좌목록 정보를 조회합니다.
 *
 * @param userId
 * @returns
 */
export const getAccountInfoListByUserId = async (
  userId?: number
): Promise<AccountInfo[]> => {
  const accountInfoList = await prisma.accountInfo.findMany({
    where: {
      user_id: userId,
    },
  });

  return accountInfoList.map((accountInfo) => AccountInfo.from(accountInfo));
};

/** @description 사용자가 보유한 주식을 조회합니다.
 *
 * @param accountNumber
 * @returns
 */
export const getOwnStockList = async (
  accountNumber: AccountInfo["accountNumber"]
): Promise<AmountStock[]> => {
  const res = await prisma.amountStock.findMany({
    where: {
      account_number: accountNumber,
    },
  });
  const result = res.map((stock) => AmountStock.from(stock));

  return result;
};

/** @desc 주식의 가격을 계산합니다.
 *
 */
export const calcStockPrice = async ({
  stockList,
  VTS_TOKEN,
  VTS_APPKEY,
  VTS_APPSECRET,
}: {
  stockList: AmountStock[];
  VTS_TOKEN: string;
  VTS_APPKEY: string;
  VTS_APPSECRET: string;
}) => {
  const calculatedStockList = await Promise.all(
    stockList.map(async (stock) => {
      const res = await getStockPrice({
        VTS_TOKEN,
        VTS_APPKEY,
        VTS_APPSECRET,
        stockId: stock.stockId,
      });
      return { ...stock, price: parseInt(res.output.stck_prpr) };
    })
  );

  return calculatedStockList;
};

export const AccountService = {
  saveNewAccount,
  getAccountInfo,
  getAccountInfoListByUserId,
  getOwnStockList,
  calcStockPrice,
};
