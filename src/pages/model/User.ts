import bcrypt from "bcrypt";
import { AccountInfo } from "./AccountInfo";
import { Notice } from "./Notice";
import { BaseModel } from "./Base";
import { IsEmail, MinLength } from "class-validator";
import { prisma } from "@/pages/service/prismaClient";

// 사용자
export class User extends BaseModel {
  id: number;

  @MinLength(6)
  password?: string;
  @IsEmail()
  email: string;
  name?: string;
  lastLoginAt: Date;
  createdAt: Date;
  deleteYn: boolean;

  noticeList?: Notice[];
  accountInfoList?: AccountInfo[];

  currentAccountInfo: AccountInfo | null;

  constructor(data: any) {
    super(data);
  }

  static async create(email: string, password: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
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
  }

  static async login(email: string, password: string): Promise<User> {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: email,
        delete_yn: false,
      },
    });

    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Password does not match");

    const res = new User(user);
    res.currentAccountInfo = await AccountInfo.findFirst({
      where: {
        user_id: user.id,
        default_account_yn: true,
      },
      isConfirm: true,
    });

    return res;
  }
}
