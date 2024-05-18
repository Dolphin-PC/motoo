import { getStockPrice } from "./OpenApiService";

describe("OpenApiService.test.ts", () => {
  it("getStockPrice", async () => {
    // given
    const VTS_TOKEN =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjY3ZDZhNDAxLWUzZjctNDEyZi1iMWFjLTMzOTE4Yjk5YzdjZCIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxNjAxNjE3NSwiaWF0IjoxNzE1OTI5Nzc1LCJqdGkiOiJQU3Vva0I3T0ducVBpYnNvcklwS21mQzFrdG1TcWNIVFA4ZHcifQ.uVfqfD8ciLJJloMdTZGeR378wMWN5ezYccCx78PiJ7jA1qANfnnuHNZcZxynypO108cKZaxvui3ONMyzjPoqlA";
    const VTS_APPKEY = "PSuokB7OGnqPibsorIpKmfC1ktmSqcHTP8dw";
    const VTS_APPSECRET =
      "L4kr8IBBEZvnQwh1r28GhBomT2nu71Id4LdugptXzF6Re8MEEwcYqxEF/2TwGZ5oZBT5n+tP41MShW6KiJ8iuD9DhD3/yIQ35YXTXTIGSl6UMyneir4EwmJLWNGLTB7reRliz1X20iPvXpDa15RQrNnk6y7kbETtm0fW5EnoPlwX9GI7HMw=";
    const stockId = "005930";

    // when
    const res = await getStockPrice({
      VTS_TOKEN,
      VTS_APPKEY,
      VTS_APPSECRET,
      stockId,
    });

    // then
    console.info(res);
  });
});
