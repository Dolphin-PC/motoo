import { createMocks } from "node-mocks-http";

import POST, { GET } from "@/pages/api/account/verify";

describe("POST /api/account/verify", () => {
  it("401 에러", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        accountNumber: 1234567890,
        appKey: "1234567890",
        appSecret: "1234567890",
      },
    });

    POST(req as any, res as any);

    expect(res._getStatusCode()).toBe(401);
    // expect(JSON.parse(res._getData())).toHaveProperty("name");
  });
});
