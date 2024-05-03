import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { User } from "../model/User";
import { prisma } from "./prismaClient";

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

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error("Password does not match");

    return new User(user);
  } catch (err) {
    throw err;
  }
};
