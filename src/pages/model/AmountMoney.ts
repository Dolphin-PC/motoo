class AmountMoney {
  krw: number;
  usd: number;

  constructor(data: any) {
    this.krw = data.krw;
    this.usd = data.usd;
  }

  fromFirebase(data: any): AmountMoney {
    return new AmountMoney(data);
  }
}
