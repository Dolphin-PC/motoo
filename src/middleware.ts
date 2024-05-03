import { withAuth } from "next-auth/middleware";
import { authOptions } from "./pages/api/auth/[...nextauth]";
import { decode } from "next-auth/jwt";
import { nextAuthJwt, nextAuthPages } from "./setting/nextAuth";

export default withAuth({
  pages: nextAuthPages,
  jwt: {
    decode: nextAuthJwt.decode,
  },
  callbacks: {
    authorized: (data) => {
      console.log("authorized", data);
      if (data) return true;

      return false;
    },
  },
});

export const config = {
  matcher: ["/v/:path*"],
};
