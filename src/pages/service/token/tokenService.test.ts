import { issueApiToken } from "./TokenService";

describe("tokenService", () => {
  it("should return a token (1분 간격)", async () => {
    // given
    let accountNumber = "3123213213213";
    let appKey = process.env.TEST_APP_KEY!;
    let appSecret = process.env.TEST_APP_SECRET!;

    try {
      // when
      const data = await issueApiToken({ accountNumber, appKey, appSecret });

      // console.log(data);

      // then
      expect(data).toHaveProperty("access_token");
      expect(data).toHaveProperty("access_token_token_expired");
    } catch (error) {
      console.error(error);
    }
  });
});
