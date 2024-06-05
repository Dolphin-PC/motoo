import { PagesOptions } from "next-auth";
import { JWTOptions } from "next-auth/jwt";

export const nextAuthPages: Partial<PagesOptions> = {
  signIn: "/sign-in",
};

export const nextAuthJwt: Partial<JWTOptions> = {
  // encode: async ({ secret, token }) => {
  //   return jwt.sign({ ...token }, secret);
  // },
  // decode: async ({ secret, token }) => {
  //   return jwt.verify(token, secret);
  // },
};
