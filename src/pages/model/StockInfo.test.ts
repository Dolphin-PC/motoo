import { StockInfo } from "./StockInfo";

describe("StockInfo", () => {
  it("findUnique", async () => {
    // given
    const stockId = "005930";
    const VTS_APPKEY = process.env.TEST_APP_KEY!;
    const VTS_APPSECRET = process.env.TEST_APP_SECRET!;
    const VTS_TOKEN =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjI5YmViZTAzLTQyMTUtNDA5MS1hMjdkLTZkZjg4NDhiYTZkNiIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxNjEzMjg0MiwiaWF0IjoxNzE2MDQ2NDQyLCJqdGkiOiJQU3Vva0I3T0ducVBpYnNvcklwS21mQzFrdG1TcWNIVFA4ZHcifQ.sZxaVeBfQ7bA5-BPuos3yM1ZtpxrsAUPdPqyEdTAqHz47WcKGcvsS_6OtjovdZg3WDTShPZme-MtISU78bf3aA";

    // when
    const result = await StockInfo.findUnique({
      stockId,
      VTS_APPKEY,
      VTS_APPSECRET,
      VTS_TOKEN,
    });

    // then
    expect(result).toBeInstanceOf(StockInfo);
    console.info(result);
  });
});
