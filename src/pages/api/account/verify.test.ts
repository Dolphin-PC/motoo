import POST from "@/pages/api/account/verify";
import { testHandler } from "@/lib/test/helper";
import { CResponse, EnumResonseMessage } from "..";
import { TIssueTokenRes } from "@/pages/service/token/TokenDao";

describe("POST /api/account/verify", () => {
  it("200 성공", async () => {
    const res = await testHandler(POST, {
      method: "POST",
      body: {
        accountNumber: "3123213213213",
        appKey: process.env.TEST_APP_KEY,
        appSecret: process.env.TEST_APP_SECRET,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    const data = res._getJSONData() as CResponse<TIssueTokenRes>;
    console.log("[data]", data);
    expect(data.message).toBe(EnumResonseMessage.ACCOUNT_SUCCESS);
  });

  it("400 에러", async () => {
    const res = await testHandler(POST, {
      method: "POST",
      body: {
        accountNumber: "0123",
        appKey: "123",
        appSecret: "123",
      },
    });

    const data = res._getJSONData() as CResponse<any>;

    expect(res._getStatusCode()).toBe(400);
    expect(data.message).toBe(EnumResonseMessage.ACCOUNT_FAIL);
  });

  it("403 에러", async () => {
    const res = await testHandler(POST, {
      method: "POST",
      body: {
        accountNumber: "01233123123123123",
        appKey: process.env.TEST_APP_KEY,
        appSecret: "12321331231233",
      },
    });
    const data = res._getJSONData() as CResponse<any>;
    // console.log("[data]", data);

    expect(res._getStatusCode()).toBe(403);
    expect([
      "접근토큰 발급 잠시 후 다시 시도하세요(1분당 1회)",
      "서버 에러가 발생했습니다.",
      "유효하지 않은 AppKey입니다.",
      "유효하지 않은 AppSecret입니다.",
    ]).toContain(data.message);
  });
});
