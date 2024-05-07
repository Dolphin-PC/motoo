// export type TUser = {
//   id: string;
//   email: string;
//   password?: string;
//   name?: string;
//   lastLoginAt?: Date;
//   createdAt?: Date;

//   noticeList?: Notice[];
//   tokenInfo?: TokenInfo;

//   amountMoney?: AmountMoney;
//   amountStock?: AmountStock[];
//   likeStock?: LikeStock[];
// };

// 사용자
export class User {
  id: string;
  email: string;
  password?: string;
  name?: string;
  lastLoginAt: Date;
  createdAt: Date;

  noticeList?: Notice[];
  accountInfo?: AccountInfo;

  amountMoney?: AmountMoney;
  amountStock?: AmountStock[];
  likeStock?: LikeStock[];

  constructor(data: any) {
    this.id = data.id;
    this.email = data.email;
    this.name = data?.name;
    this.lastLoginAt = data.lastLoginAt ?? new Date();
    this.createdAt = data.createdAt ?? new Date();

    this.noticeList = data?.noticeList;
    this.accountInfo = data?.accountInfo;

    this.amountMoney = data?.amountMoney;
    this.amountStock = data?.amountStock;
    this.likeStock = data?.likeStock;
  }
}
