import { testHandler } from "@/lib/test/helper";
import POST from "./new";

// jest.mock("next-auth/react", () => {
//   const originalModule = jest.requireActual("next-auth/react");
//   const mockSession = {
//     expires: new Date(Date.now() + 2 * 86400).toISOString(),
//     user: { id: 10 },
//   };
//   return {
//     __esModule: true,
//     ...originalModule,
//     useSession: jest.fn(() => {
//       return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
//     }),
//   };
// });

describe("AccountService.test.ts", () => {
  it("모의계좌 Controller | 성공", async () => {
    const res = await testHandler(POST, {
      method: "POST",
      body: {},
    });

    const data = await res._getJSONData();
    console.log(data);

    // expect(res._getStatusCode()).toBe(200);
  });
});
