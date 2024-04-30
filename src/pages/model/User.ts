export type TUser = {
  uid: string;
  email: string;
  name?: string;
  lastLoginAt?: Date;
  createdAt?: Date;

  noticeList?: Notice[];
  tokenInfo?: TokenInfo;

  amountMoney?: AmountMoney;
  amountStock?: AmountStock[];
  likeStock?: LikeStock[];
};

// 사용자
export class User {
  uid: string;
  email: string;
  name?: string;
  lastLoginAt: Date;
  createdAt: Date;

  noticeList?: Notice[];
  tokenInfo?: TokenInfo;

  amountMoney?: AmountMoney;
  amountStock?: AmountStock[];
  likeStock?: LikeStock[];

  constructor(data: TUser) {
    this.uid = data.uid;
    this.email = data.email;
    this.name = data?.name;
    this.lastLoginAt = data.lastLoginAt ?? new Date();
    this.createdAt = data.createdAt ?? new Date();

    this.noticeList = data?.noticeList;
    this.tokenInfo = data?.tokenInfo;

    this.amountMoney = data?.amountMoney;
    this.amountStock = data?.amountStock;
    this.likeStock = data?.likeStock;
  }
}
