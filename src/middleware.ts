import { withAuth } from "next-auth/middleware";
import { nextAuthPages } from "./lib/setting/nextAuth";

export default withAuth({
  pages: nextAuthPages,
  // jwt: {
  //   decode: nextAuthJwt.decode,
  // },
  // callbacks: {
  //   authorized: ({ req, token }) => {
  //     // console.log("token", token); // this token is always null!!

  //     const sessionToken = req.cookies.get("next-auth.session-token");

  //     if (!sessionToken) return false;

  //     return true;
  //   },
  // },
});

export const config = {
  matcher: ["/v/:path*"],
};
``;
