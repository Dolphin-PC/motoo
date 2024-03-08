// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface LoginBody {
  username: string;
  password: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password }: LoginBody = req.body;

  // 여기서 사용자 인증을 수행합니다 (예: 데이터베이스 조회)
  // 이 예제에서는 모든 사용자를 인증한다고 가정합니다

  const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
}
