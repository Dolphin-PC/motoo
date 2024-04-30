// pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from "next";
import { CResponse } from "..";
import { createUser } from "@/pages/service/UserService";
import { User } from "@/pages/model/User";

export type TSignUpReq = {
  email: string;
  password: string;
  confirm: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CResponse<User>>
) {
  const { email, password, confirm }: TSignUpReq = JSON.parse(req.body);

  try {
    // console.log(password, confirm);
    if (password !== confirm) {
      throw new Error("Password and confirm password do not match");
    }

    const user = await createUser(email, password);
    res
      .status(200)
      .json(new CResponse({ message: "User created", data: user }));
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message, error: error });
    }
  }
}
