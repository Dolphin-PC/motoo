import {
  AccountInfo,
  AccountInfoValidatorGroups,
} from "@/pages/model/AccountInfo";
import { prisma } from "../prismaClient";
import { ValidationError, validateOrReject } from "class-validator";
import { AccountInfo as P_AccountInfo } from "@prisma/client";

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
      user_id: accountInfo.user_id,
    },
  });

  if (accountListByUserId.length == 0) accountInfo.defaultAccountYn = true;

  // console.log("accountInfo.toPrisma()", accountInfo.toPrisma());
  const newAccountInfo = await prisma.accountInfo.create({
    data: accountInfo.toPrisma(),
  });

  return AccountInfo.from(newAccountInfo);
};

export const getAccountInfo = async (
  accountNumber: string
): Promise<AccountInfo | null> => {
  const accountInfo = await prisma.accountInfo.findFirst({
    where: {
      account_number: accountNumber,
    },
  });

  if (accountInfo == null) return null;

  return AccountInfo.from(accountInfo);
};

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
