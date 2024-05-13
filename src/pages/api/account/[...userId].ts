import type { NextApiRequest, NextApiResponse } from "next";
import { ResOk } from "..";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { getAccountInfoListByUserId } from "@/pages/service/account/AccountService";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    const data = await getAccountInfoListByUserId(parseInt(userId![0]));

    res
      .status(200)
      .json(ResOk<AccountInfo[]>(data, "계좌정보를 성공적으로 가져왔습니다."));
  } catch (error) {
    res.status(400).json({
      message: "계좌정보를 가져오는데 실패했습니다.",
      error,
    });
  }
}
