import { AccountInfo } from "@/pages/model/AccountInfo";
import {
  calcStockPrice,
  getAccountInfo,
  getOwnStockList,
  saveNewAccount,
} from "./AccountService";
import { ValidationError } from "class-validator";
import { issueApiToken } from "../token/TokenService";

describe("AccountService.test.ts", () => {
  it("새로운 모의계좌 등록 | 성공", async () => {
    // given
    const accountInfo = new AccountInfo();
    accountInfo.userId = 1;
    accountInfo.accountNumber = "1234567890";
    accountInfo.appKey = process.env.TEST_APP_KEY!;
    accountInfo.appSecret = process.env.TEST_APP_SECRET!;
    accountInfo.defaultAccountYn = false;

    try {
      const tokenRes = await issueApiToken({
        accountNumber: accountInfo.accountNumber,
        appKey: accountInfo.appKey,
        appSecret: accountInfo.appSecret,
      });

      accountInfo.apiToken = tokenRes.access_token;
      accountInfo.apiTokenExpiredAt = tokenRes.access_token_token_expired;

      // when
      const res = await saveNewAccount(accountInfo);

      // console.log(res);

      //then
      const find = await getAccountInfo(accountInfo.accountNumber);

      expect(find).toEqual(res);
    } catch (error) {
      console.error(error);
    }
  });

  it.skip("새로운 모의계좌 등록 | 실패 | 이미 등록된 계좌", async () => {
    // given
    const accountInfo = new AccountInfo();
    accountInfo.userId = 12;
    accountInfo.accountNumber = "1234567890";
    accountInfo.appKey = "appKeyappKeyappKey";
    accountInfo.appSecret = "appSecretappSecretappSecretappSecret";
    accountInfo.defaultAccountYn = false;

    // when
    try {
      await saveNewAccount(accountInfo);
    } catch (error) {
      //then
      expect(error).toEqual(new Error("이미 등록된 계좌입니다."));
    }
  });

  it.skip("새로운 모의계좌 등록 | 실패 | validate error", async () => {
    // given

    const accountInfo = new AccountInfo();
    accountInfo.userId = 12; // Add the missing properties
    accountInfo.accountNumber = "120";
    accountInfo.appKey = "appKeyappKeyappKey";
    accountInfo.appSecret = "appSecretappSecretappSecretappSecret";
    accountInfo.defaultAccountYn = false;

    // when

    try {
      await saveNewAccount(accountInfo);
    } catch (error) {
      console.log("error", typeof error, error);

      //then
      expect(error).toBeInstanceOf(ValidationError);
    }
  });

  it("계좌정보 조회", async () => {
    // given
    let accountNumber = "1234567890";

    // when
    let account = await getAccountInfo(accountNumber);

    // then
    if (account) {
      expect(account).toBeInstanceOf(AccountInfo);
    }
  });

  it("보유주식 조회 by accountNumber", async () => {
    // given
    let accountNumber = "333333333333";

    // when
    let account = await getOwnStockList(accountNumber);

    // then
    console.info(account);
  });

  it("보유주식가격 조회", async () => {
    // given
    let accountNumber = "333333333333";

    // given-pre
    let account = await getAccountInfo(accountNumber);
    let stockList = await getOwnStockList(accountNumber);
    // const stockIdList = stockList.map((stock) => stock.stockId);

    // console.info(stockList);
    // when
    let res = await calcStockPrice({
      stockList,
      VTS_TOKEN: account!.apiToken!,
      VTS_APPKEY: account!.appKey!,
      VTS_APPSECRET: account!.appSecret!,
    });
    console.info(res);
    console.log(res.reduce((acc, cur) => acc + cur.price * cur.quantity, 0));
  });
});
