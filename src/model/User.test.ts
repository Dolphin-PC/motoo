import { User } from "./User";

describe("User", () => {
  it("login", async () => {
    // given
    const email = "test@gmail.com";
    const password = "qwerqwer";

    // when
    const user = await User.login(email, password);

    // then
    console.info(user);
    expect(user).toBeInstanceOf(User);
  });
});
