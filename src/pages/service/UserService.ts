import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { User } from "../model/User";

const prisma = new PrismaClient();

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    // console.log("user", user);
    if (user) throw new Error("User already exists");

    // TODO check password strength

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return new User(newUser);
  } catch (err) {
    throw err;
  }
};
