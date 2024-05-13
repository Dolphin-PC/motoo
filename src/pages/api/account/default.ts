import prisma from "@/pages/service/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { CResponse, ResOk } from "..";

export type TChangeDefaultAccount = {
  prevAccountNumber: string;
  newAccountNumber: string;
};
export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<CResponse<string>>
) {
  const { prevAccountNumber, newAccountNumber }: TChangeDefaultAccount =
    req.body;

  const session = await getServerSession(req, res, authOptions);

  await prisma.accountInfo.update({
    where: {
      user_id: session?.user.id,
      account_number: prevAccountNumber,
    },
    data: {
      default_account_yn: false,
    },
  });

  await prisma.accountInfo.update({
    where: {
      user_id: session?.user.id,
      account_number: newAccountNumber,
    },
    data: {
      default_account_yn: true,
    },
  });

  res.status(200).json(ResOk(newAccountNumber, "default account changed"));
}
