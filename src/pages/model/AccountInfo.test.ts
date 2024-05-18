import { AccountInfo } from "./AccountInfo";
describe("AccountInfo", () => {
  it("should create an instance", async () => {
    const res = await AccountInfo.findFirst({
      user_id: 1,
      default_account_yn: true,
    });

    console.info(res);
    expect(res).toBeInstanceOf(AccountInfo);
  });
});
