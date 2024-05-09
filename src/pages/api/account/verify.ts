import { TNewAccount } from "@/app/v/my/account/new/page";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { issueAppToken } from "@/pages/service/OpenApiService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { accountNumber, appKey, appSecret }: TNewAccount = req.body;

  try {
    const accountInfo = new AccountInfo(req.body);

    issueAppToken(accountInfo);

    res.status(200).json({ message: "Hello" });
  } catch (error) {
    res.status(401).json(error);
  }
}

export function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Hello" });
}
