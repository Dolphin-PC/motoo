import bcrypt from "bcrypt";
import { User } from "../model/User";
import { prisma } from "./prismaClient";
import { AccountInfo } from "../model/AccountInfo";

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  // console.log("user", user);
  if (user) throw new Error("User already exists");

  // TODO check password strength

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  return new User(newUser);
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Password does not match");

  // 사용자 토큰 정보 table
  const accountInfo = await prisma.accountInfo.findFirst({
    where: {
      id: user.id,
      default_account_yn: true,
    },
  });

  const res = new User(user);
  if (accountInfo) {
    res.currentAccountInfo = AccountInfo.from(accountInfo);
  }

  return res;
};

export const getAccountInfoListByUserId = async (
  userId: number
): Promise<AccountInfo[]> => {
  const accountInfoList = await prisma.accountInfo.findMany({
    where: {
      id: userId,
    },
  });

  return accountInfoList.map((accountInfo) => AccountInfo.from(accountInfo));
};
