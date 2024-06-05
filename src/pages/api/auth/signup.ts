// pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from "next";
import { CResponse, ResInvalid, ResOk } from "..";
import { User } from "@/model/User";

export type TSignUpReq = {
  email: string;
  password: string;
  confirm: string;
};

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<CResponse<User>>
) {
  const { email, password, confirm }: TSignUpReq = JSON.parse(req.body);

  try {
    // console.log(password, confirm);
    if (password !== confirm) {
      throw new Error("Password and confirm password do not match");
    }

    const user = await User.create(email, password);
    res.status(200).json(ResOk(user, "User created"));
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(ResInvalid(error, error.message));
    }
  }
}
