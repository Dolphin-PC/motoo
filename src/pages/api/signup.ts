// pages/api/signup.ts
import { auth } from "@/setting/firebase";
import { NextApiRequest, NextApiResponse } from "next";

interface SignupBody {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password }: SignupBody = req.body;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    const user = userCredential.user;

    res.status(200).json({ uid: user?.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
