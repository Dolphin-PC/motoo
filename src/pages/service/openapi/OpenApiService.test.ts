import { OpenApiService } from "./OpenApiService";

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
    const res = await OpenApiService.getStockPrice({
      VTS_TOKEN,
      VTS_APPKEY,
      VTS_APPSECRET,
      stockId,
    });

    // then
    console.info(res);
  });

  it("주식당일 분봉조회", async () => {
    // given

    // then
    try {
      const res = await OpenApiService.inquireTimeItemChartPrice({
        VTS_APPKEY: process.env.TEST_APP_KEY!,
        VTS_APPSECRET: process.env.TEST_APP_SECRET!,
        VTS_TOKEN: process.env.TEST_VTS_TOKEN!,
        stockId: "005380",
        startTime: "123000",
      });

      // when
      console.info(res);
    } catch (error) {
      console.error(error);
    }
  });

  it("웹 소켓 발급", async () => {
    try {
      // given

      // when
      const res = await OpenApiService.issueWebSocketApprovalKey({
        appKey: process.env.TEST_APP_KEY!,
        secretKey: process.env.TEST_APP_SECRET!,
      });

      // then
      console.info(res);
    } catch (error) {
      console.error(error);
    }
  });

  it("주식 잔고 조회", async () => {
    try {
      // given

      // when
      const res = await OpenApiService.inquireStockBalance({
        accountNumber: "50104221",
        appkey: process.env.TEST_APP_KEY!,
        appsecret: process.env.TEST_APP_SECRET!,
        VTS_TOKEN: process.env.TEST_VTS_TOKEN!,
      });

      // then
      console.info(res);
    } catch (error) {
      console.error(error);
    }
  });

  it("매수가능조회", async () => {
    // given
    const accountNumber = "50104221";
    const appkey = process.env.TEST_APP_KEY!;
    const appSecret = process.env.TEST_APP_SECRET!;
    const VTS_TOKEN = process.env.TEST_VTS_TOKEN!;
    const stockId = "005930";
    const orderPrice = "75000";

    // when
    const res = await OpenApiService.inquirePsblOrder(
      { VTS_TOKEN, VTS_APPKEY: appkey, VTS_APPSECRET: appSecret },
      {
        accountNumber,
        orderPrice,
        orderType: "00",
        stockId,
      }
    );
    // then
    console.info(res);
  });

  it("주식 매수 테스트", async () => {
    // given
    const accountNumber = process.env.TEST_ACCOUNT_NUMBER!;
    const appkey = process.env.TEST_APP_KEY!;
    const appSecret = process.env.TEST_APP_SECRET!;
    const VTS_TOKEN = process.env.TEST_VTS_TOKEN!;

    // when
    try {
      const res = await OpenApiService.orderCash(
        {
          VTS_APPKEY: appkey,
          VTS_APPSECRET: appSecret,
          VTS_TOKEN: VTS_TOKEN,
        },
        "BUY",
        {
          CANO: accountNumber,
          ORD_UNPR: "70000",
          ORD_QTY: "1",
          ORD_DVSN: "00",
          PDNO: "005930",
        }
      );

      // then
      console.info(res);
    } catch (error) {
      console.error(error);
    }
  });

  it("주식 정정취소 테스트", async () => {
    // given
    const accountNumber = process.env.TEST_ACCOUNT_NUMBER!;
    const appkey = process.env.TEST_APP_KEY!;
    const appSecret = process.env.TEST_APP_SECRET!;
    const VTS_TOKEN = process.env.TEST_VTS_TOKEN!;

    // when
    try {
      // const 매수주문응답 = await OpenApiService.orderCash(
      //   {
      //     VTS_APPKEY: appkey,
      //     VTS_APPSECRET: appSecret,
      //     VTS_TOKEN: VTS_TOKEN,
      //   },
      //   "BUY",
      //   {
      //     CANO: accountNumber,
      //     ORD_UNPR: "78000",
      //     ORD_QTY: "1",
      //     ORD_DVSN: "00",
      //     PDNO: "005930",
      //   }
      // );

      const 매도주문응답 = await OpenApiService.cancelOrder(
        {
          VTS_APPKEY: appkey,
          VTS_APPSECRET: appSecret,
          VTS_TOKEN: VTS_TOKEN,
        },
        {
          cancelType: "REVISE",
          CANO: accountNumber,
          isAllOrder: "Y",
          ORD_DVSN: "00",
          ORD_QTY: "1",
          ORD_UNPR: "78000",
          ORGN_ODNO: "23941",
        }
      );

      // then
      console.info(매도주문응답);
    } catch (error) {
      console.error(error);
    }
  });
});
