import { AccountInfo } from "@/pages/model/AccountInfo";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { CResponse, ResInvalid, ResOk } from "..";
import { saveNewAccount } from "@/pages/service/account/AccountService";
import { TNewAccount } from "@/app/v/my/account/new/page";

const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<CResponse<AccountInfo>>
) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (session == null || !session.user.id) throw new Error("Unauthorized");

    const {
      accountNumber,
      appKey,
      appSecret,
      apiToken,
      apiTokenExpiredAt,
    }: TNewAccount = req.body;
    // console.log(accountNumber, appKey, appSecret);

    const newAccount = new AccountInfo();
    newAccount.user_id = session.user.id;
    newAccount.accountNumber = accountNumber;
    newAccount.appKey = appKey;
    newAccount.appSecret = appSecret;
    newAccount.defaultAccountYn = false;
    newAccount.apiToken = apiToken ?? null;
    newAccount.apiTokenExpiredAt = apiTokenExpiredAt ?? null;

    let resAccount = await saveNewAccount(newAccount);

    // saveNewAccount(accountInfo);
    res.status(200).json(ResOk(resAccount, "계좌가 등록되었습니다."));
  } catch (error) {
    res.status(400).json(ResInvalid(error, "계좌 등록에 실패했습니다."));
  }
};

export default POST;
