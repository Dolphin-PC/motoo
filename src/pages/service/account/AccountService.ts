import {
  AccountInfo,
  AccountInfoValidatorGroups,
} from "@/pages/model/AccountInfo";
import { prisma } from "../prismaClient";
import { validateOrReject } from "class-validator";

export const saveNewAccount = async (accountInfo: AccountInfo) => {
  await validateOrReject(accountInfo, {
    groups: [AccountInfoValidatorGroups.new],
  });

  const newAccountInfo = await prisma.accountInfo.create({
    data: accountInfo.toPrisma(),
  });

  return newAccountInfo;
};
