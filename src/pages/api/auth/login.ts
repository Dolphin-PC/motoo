// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/pages/model/User";
import { loginUser } from "@/pages/service/UserService";

export type TSignInRes = {
  token: string;
  rfToken: string;
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, password }: User = req.body;

  try {
    if (email && password) {
      const user = await loginUser(email, password);

      res.status(200).json(user);
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ message: err.message });
    }
  }
}
