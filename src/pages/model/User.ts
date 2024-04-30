// 사용자
class User {
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

  constructor(data: any) {
    this.uid = data.uid;
    this.email = data.email;
    this.name = data?.name;
    this.lastLoginAt = data.lastLoginAt;
    this.createdAt = data.createdAt;

    this.noticeList = data?.noticeList;
    this.tokenInfo = data?.tokenInfo;

    this.amountMoney = data?.amountMoney;
    this.amountStock = data?.amountStock;
    this.likeStock = data?.likeStock;
  }

  fromFirebase(data: any): User {
    return new User(data);
  }

  toFirebase(): any {
    return {
      uid: this.uid,
      email: this.email,
      name: this.name,
      lastLoginAt: this.lastLoginAt || new Date(),
      createdAt: this.createdAt || new Date(),
      noticeList: this.noticeList,
      tokenInfo: this.tokenInfo,
      amountMoney: this.amountMoney,
      amountStock: this.amountStock,
      likeStock: this.likeStock,
    };
  }
}
