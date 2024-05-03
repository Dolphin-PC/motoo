import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized: ({ req }) => {
      // verify token and return a boolean
      const sessionToken = req.cookies.get("next-auth.session-token");
      if (sessionToken) return true;
      else {
        return false;
      }
    },
  },
});

export const config = {
  matcher: ["/v/:path*"],
};
