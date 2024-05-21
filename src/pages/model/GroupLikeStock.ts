import { Prisma } from "@prisma/client";
import { BaseModel } from "./Base";
import { LikeStock } from "./LikeStock";
import prisma from "../service/prismaClient";
import { AccountInfo } from "./AccountInfo";

export class GroupLikeStock extends BaseModel {
  id: number;
  groupName: string;
  groupPriority: number;
  accountNumber: string;

  likeStockList: LikeStock[];

  constructor(data: any) {
    super(data);
  }

  // methods //
  // methods //

  // statics //
  static async findMany({
    where,
  }: {
    where: Prisma.GroupLikeStockWhereInput;
  }): Promise<GroupLikeStock[]> {
    return await prisma.groupLikeStock
      .findMany({ where: where, orderBy: { group_prioirty: "asc" } })
      .then((res) => res.map((stock) => new GroupLikeStock(stock)));
  }

  static async findFirst({
    where,
  }: {
    where: Prisma.GroupLikeStockWhereInput;
  }): Promise<GroupLikeStock | null> {
    const result = await prisma.groupLikeStock.findFirst({ where });
    if (result == null) return null;
    return new GroupLikeStock(result);
  }

  static async create({
    accountNumber,
    groupName,
  }: {
    accountNumber: AccountInfo["accountNumber"];
    groupName: GroupLikeStock["groupName"];
  }): Promise<GroupLikeStock> {
    const count = await prisma.groupLikeStock.count({
      where: { account_number: accountNumber },
    });
    //// 생성시간을 우선순위로 사용
    //// const priority = new Date().getTime();
    const result = await prisma.groupLikeStock.create({
      data: {
        group_name: groupName,
        group_prioirty: count + 1,
        account_number: accountNumber,
      },
    });
    return new GroupLikeStock(result);
  }

  //   static async getLikeStockByGroupList({
  //     accountNumber,
  //   }: {
  //     accountNumber: string;
  //   }): Promise<any[]> {
  //     const groupLikeList = await GroupLikeStock.findMany({
  //       where: { account_number: accountNumber },
  //     });

  //     const groupLikeStockList = Promise.all(
  //       groupLikeList.map(async (group) => {
  //         const likeStockList = await LikeStock.findMany({
  //           where: { group_id: group.id },
  //         });

  //         return { ...group, likeStockList };
  //       })
  //     );
  //   }
  // statics //
}
