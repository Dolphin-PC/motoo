import {
  AccountInfo,
  AccountInfoValidatorGroups,
} from "@/pages/model/AccountInfo";
import { prisma } from "../prismaClient";
import { ValidationError, validateOrReject } from "class-validator";
import { AccountInfo as P_AccountInfo } from "@prisma/client";

export const saveNewAccount = async (
  accountInfo: AccountInfo
): Promise<P_AccountInfo> => {
  await validateOrReject(accountInfo, {
    groups: [AccountInfoValidatorGroups.new],
  }).catch((errors: ValidationError[]) => {
    throw errors[0];
  });

  const existsAccount = await getAccountInfo(accountInfo.accountNumber);
  if (existsAccount) {
    throw new Error("이미 등록된 계좌입니다.");
  }

  const newAccountInfo = await prisma.accountInfo.create({
    data: accountInfo.toPrisma(),
  });

  return newAccountInfo;
};

export const getAccountInfo = async (accountNumber: string) => {
  const accountInfo = await prisma.accountInfo.findFirst({
    where: {
      account_number: accountNumber,
    },
  });

  return accountInfo;
};
