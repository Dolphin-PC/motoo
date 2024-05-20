// ** 사용자관련 메소드 ** //
// 1. DELETE : 사용자 삭제

import prisma from "@/pages/service/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { ResOk } from "..";

export type TDeleteUser = {
  userId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  if (req.method == "DELETE") {
    if (userId?.length) {
      const userId_0 = userId[0];
      console.log(userId_0);

      const deletedUser = await prisma.user.update({
        where: {
          id: parseInt(userId_0),
        },
        data: {
          delete_yn: true,

          //   delete_yn: true,
        },
      });

      res
        .status(200)
        .json(ResOk(deletedUser, "사용자를 성공적으로 삭제했습니다."));
    } else {
      res.status(400).json({
        message: "사용자를 삭제하는데 실패했습니다.",
      });
    }
  }
}
