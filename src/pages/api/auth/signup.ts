// pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from "next";
import { CResponse } from "..";

export type TSignUpReq = {
  email: string;
  password: string;
  confirm: string;
};

export type TSignUpRes = {
  uid?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CResponse<TSignUpRes>>
) {
  const { email, password, confirm }: TSignUpReq = JSON.parse(req.body);

  try {
    // console.log(password, confirm);
    if (password !== confirm) {
      throw new Error("Password and confirm password do not match");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message, error: error });
    }
  }
}
