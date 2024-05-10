import { issueAppToken } from "./TokenService";

describe.skip("tokenService", () => {
  it("should return a token (1분 간격)", async () => {
    // given
    let accountNumber = "3123213213213";
    let appKey = process.env.TEST_APP_KEY!;
    let appSecret = process.env.TEST_APP_SECRET!;

    // when
    const data = await issueAppToken({ accountNumber, appKey, appSecret });

    // console.log(data);

    expect(data).toHaveProperty("access_token");
    expect(data).toHaveProperty("access_token_token_expired");
  });
});
