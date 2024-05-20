import { prisma } from "@/pages/service/prismaClient";
import { MinLength } from "class-validator";
import { BaseModel } from "./Base";
import { Prisma } from "@prisma/client";

export class AmountMoney extends BaseModel {
  @MinLength(10)
  accountNumber: string;

  krw: number;
  usd: number;

  constructor(data: any) {
    super(data);
  }

  /** @description 새로운 AmountMoney를 생성합니다.
   * @param param0
   * @returns
   */
  static async newSave({
    accountNumber,
    krw = 0,
    usd = 0,
  }: {
    accountNumber: string;
    krw?: number;
    usd?: number;
  }) {
    return prisma.amountMoney.create({
      data: {
        account_number: accountNumber,
        krw: krw,
        usd: usd,
      },
    });
  }

  static async findUnique({
    where,
  }: {
    where: Prisma.AmountMoneyWhereUniqueInput;
  }): Promise<AmountMoney> {
    return new AmountMoney(await prisma.amountMoney.findUnique({ where }));
  }
}
