import { createMocks } from "node-mocks-http";

import POST, { GET } from "@/pages/api/account/verify";
import { testHandler } from "@/lib/test/helper";
import { CResponse, EnumResonseMessage } from "..";
import {
  TIssueTokenRes,
  TIssueTokenResError,
} from "@/pages/service/token/TokenDao";

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

    expect(res._getStatusCode()).toBe(400);
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

    expect(res._getStatusCode()).toBe(400);

    const data = res._getJSONData() as CResponse<TIssueTokenResError>;
    expect([]);
  });
});
