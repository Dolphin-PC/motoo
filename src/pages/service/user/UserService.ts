import bcrypt from "bcrypt";
import { User } from "../../model/User";
import { prisma } from "../prismaClient";
import { AccountInfo } from "../../model/AccountInfo";
import { issueApiToken } from "../token/TokenService";

/** @deprecated
 */
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

/** @deprecated
 *
 * @param email
 * @param password
 * @returns
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      delete_yn: false,
    },
  });

  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Password does not match");

  // 사용자 토큰 정보 table
  let accountInfo = await prisma.accountInfo.findFirst({
    where: {
      user_id: user.id,
      default_account_yn: true,
    },
  });

  if (accountInfo != null) {
    if (
      accountInfo.api_token == null ||
      accountInfo.api_token_expired_at == null ||
      accountInfo.api_token_expired_at < new Date()
    ) {
      const res = await issueApiToken({
        accountNumber: accountInfo.account_number,
        appKey: accountInfo.app_key,
        appSecret: accountInfo.app_secret,
      });

      accountInfo = await prisma.accountInfo.update({
        where: {
          account_number: accountInfo.account_number,
        },
        data: {
          api_token: res.access_token,
          api_token_expired_at: res.access_token_token_expired,
        },
      });
    }
  }

  const res = new User(user);
  if (accountInfo) {
    res.currentAccountInfo = AccountInfo.from(accountInfo);
  }

  return res;
};

export const UserService = {
  createUser,
  loginUser,
};
