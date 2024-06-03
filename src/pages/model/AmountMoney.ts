import { prisma } from "@/pages/service/prismaClient";
import { Length, MinLength } from "class-validator";
import { BaseModel } from "./Base";
import { Prisma } from "@prisma/client";
import { TInquireStockBalanceRes } from "../service/openapi/biz/inquireStockBalance";

export class AmountMoney extends BaseModel {
  @Length(8, 8)
  accountNumber: string;

  /** 예수금총액 */
  dncaTotAmt: string;
  /** 익일정산금액(D+1예수금) */
  nxdyExccAmt: string;
  /** 가수도정산금액(D+2예수금) */
  prvsRcdlExccAmt: string;
  /** CMA평가금액 */
  cmaEvluAmt: string;
  /** 전일매수금액 */
  bfdyBuyAmt: string;
  /** 금일매수금액 */
  thdtBuyAmt: string;
  /** 전일매도금액 */
  bfdySllAmt: string;
  /** 금일매도금액 */
  thdtSllAmt: string;
  /** 유가평가금액 */
  sctsEvluAmt: string;
  /** 총평가금액 */
  totEvluAmt: string;
  /** 순자산금액 */
  nassAmt: string;
  /** 매입금액합계금액 */
  pchsAmtSmtlAmt: string;
  /** 평가금액합계금액 */
  evluAmtSmtlAmt: string;
  /** 평가손익합계금액 */
  evluPflsSmtlAmt: string;
  /** 전일총자산평가금액 */
  bfdyTotAsstEvluAmt: string;
  /** 자산증감액 */
  assticdcAmt: string;
  /** 익일자동상환금액 */
  nxdyAutoRdptAmt: string;
  /** D+2자동상환금액 */
  d2AutoRdptAmt: string;
  /** 전일제비용금액 */
  bfdyTlexAmt: string;
  /** 금일제비용금액 */
  thdtTlexAmt: string;
  /** 총대출금액 */
  totLoanAmt: string;
  /** 융자금자동상환여부 */
  fncgGldAutoRdptyn: string;
  /** 총대주매각대금 */
  totStlnSlngChgs: string;
  /** 자산증감수익율(데이터미제공) */
  asstIcdcErngRt: string;

  constructor(data: any) {
    super(data);
  }

  // statics //
  /** @description 새로운 AmountMoney를 생성합니다. */
  static async newSave({
    accountNumber,
  }: {
    accountNumber: AmountMoney["accountNumber"];
  }) {
    return prisma.amountMoney.create({
      data: {
        account_number: accountNumber,
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

  /** 주식잔고 동기화 */
  static async update({
    accountNumber,
    data,
  }: {
    accountNumber: AmountMoney["accountNumber"];
    data: TInquireStockBalanceRes["output2"];
  }): Promise<void> {
    {
      await prisma.amountMoney.update({
        where: {
          account_number: accountNumber,
        },
        data: data[0],
      });
    }
  }
  // statics //
}
