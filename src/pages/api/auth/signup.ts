// pages/api/signup.ts
import { CFirebaseError, auth } from "@/setting/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import { FirebaseError } from "firebase/app";
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

    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    const user = userCredential.user;

    console.log(user?.uid);

    res.status(200).json(new CResponse("User created", { uid: user?.uid }));
  } catch (error) {
    if (error instanceof FirebaseError) {
      res.status(400).json({
        message: error.message,
        error: new CFirebaseError(error),
      });
    }
    if (error instanceof Error) {
      res.status(400).json({ message: error.message, error: error });
    }
  }
}
