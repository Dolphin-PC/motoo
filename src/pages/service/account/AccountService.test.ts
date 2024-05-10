import { AccountInfo } from "@/pages/model/AccountInfo";
import { saveNewAccount } from "./AccountService";

describe("AccountService.test.ts", () => {
  it("새로운 모의계좌 등록 | 성공", async () => {
    // given
    const accountInfo = new AccountInfo();
    accountInfo.id = 12;
    accountInfo.accountNumber = "1234567890";
    accountInfo.appKey = "appKeyappKeyappKey";
    accountInfo.appSecret = "appSecretappSecretappSecretappSecret";
    accountInfo.defaultAccountYn = false;

    // when
    const res = await saveNewAccount(accountInfo);

    //then
    expect(res).not.toBeNull();
  });
});
