import { AccountInfo } from "@/pages/model/AccountInfo";
import { getAccountInfo, saveNewAccount } from "./AccountService";
import { ValidationError } from "class-validator";

describe("AccountService.test.ts", () => {
  it.skip("새로운 모의계좌 등록 | 성공", async () => {
    // given
    const accountInfo = new AccountInfo();
    accountInfo.user_id = 12; // Add the missing properties
    accountInfo.accountNumber = "1234567890";
    accountInfo.appKey = "appKeyappKeyappKey";
    accountInfo.appSecret = "appSecretappSecretappSecretappSecret";
    accountInfo.defaultAccountYn = false;

    // when
    const res = await saveNewAccount(accountInfo);

    console.log(res);

    //then
    const find = await getAccountInfo(accountInfo.accountNumber);

    expect(find).toEqual(res);
  });

  it.skip("새로운 모의계좌 등록 | 실패 | 이미 등록된 계좌", async () => {
    // given
    const accountInfo = new AccountInfo();
    accountInfo.user_id = 12;
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
    accountInfo.user_id = 12; // Add the missing properties
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
});
