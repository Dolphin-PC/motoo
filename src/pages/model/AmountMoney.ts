import { prisma } from "@/pages/service/prismaClient";
import { MinLength } from "class-validator";
import { BaseModel } from "./Base";

export class AmountMoney extends BaseModel {
  @MinLength(10)
  accountNumber: string;

  krw: number;
  usd: number;

  constructor(data: any) {
    super(data);
  }

  /** @description 새로운 AmountMoney를 생성합니다.
   * @param accountNumber
   * @param krw
   * @param usd
   * @returns
   */
  static async newSave(
    accountNumber: string,
    krw: number = 0,
    usd: number = 0
  ) {
    return prisma.amountMoney.create({
      data: {
        account_number: accountNumber,
        krw: krw,
        usd: usd,
      },
    });
  }
}
