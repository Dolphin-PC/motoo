import { Length, MinLength } from "class-validator";
import { BaseModel } from "./Base";
import { Prisma } from "@prisma/client";
import prisma from "../service/prismaClient";

export class LikeStock extends BaseModel {
  @Length(8, 8)
  accountNumber: number;
  stockId: string;

  constructor(data: any) {
    super(data);
  }
  // statics //
  static findMany = async ({
    where,
  }: {
    where: Prisma.LikeStockWhereInput;
  }): Promise<LikeStock[]> => {
    const result = await prisma.likeStock
      .findMany({ where })
      .then((res) => res.map((stock) => new LikeStock(stock)));
    return result;
  };
  // statics //
}
