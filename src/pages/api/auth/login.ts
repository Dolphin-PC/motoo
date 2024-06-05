// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/pages/model/User";

export type TSignInRes = {
  token: string;
  rfToken: string;
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *    tags:
 *     - Auth
 *    description: 유저 로그인
 *    parameters:
 *      - name: email
 *        in: formData
 *        required: true
 *        type: string
 *        description: 이메일
 *      - name: password
 *        in: formData
 *        required: true
 *        type: string
 *        description: 비밀번호
 *    responses:
 *      200:
 *        description: 로그인 성공
 *      401:
 *        description: 로그인 실패
 */
export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, password }: User = req.body;

  try {
    if (email && password) {
      const user = await User.login(email, password);

      res.status(200).json(user);
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ message: err.message });
    }
  }
}
