import { AccountInfo } from "@/pages/model/AccountInfo";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ResInvalid, ResOk } from "..";
import { saveNewAccount } from "@/pages/service/account/AccountService";

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (session == null || !session.user.id) throw new Error("Unauthorized");

    // TODO 계좌 등록
    const { accountNumber, appKey, appSecret }: AccountInfo = req.body;
    // console.log(accountNumber, appKey, appSecret);

    const newAccount = new AccountInfo();
    newAccount.user_id = session.user.id;
    newAccount.accountNumber = accountNumber;
    newAccount.appKey = appKey;
    newAccount.appSecret = appSecret;
    newAccount.defaultAccountYn = false;

    let resAccount = await saveNewAccount(newAccount);

    // saveNewAccount(accountInfo);
    res.status(200).json(ResOk(resAccount, "계좌가 등록되었습니다."));
  } catch (error) {
    const re = ResInvalid(error, "계좌 등록에 실패했습니다.");
    // console.log(re);
    res.status(400).json(re);
  }
};

export default POST;
