// pages/api/verify.ts
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface VerifyBody {
  token: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token }: VerifyBody = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    res.status(200).json({ username: (decoded as any).username });
  } catch (err) {
    res.status(401).json({ message: "Invalid" });
  }
}
