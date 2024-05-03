import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email/Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password", placeholder: "" },
      },
      async authorize(credentials): Promise<any> {
        // console.log("credentials", credentials);
        // 로그인 로직
        const res = await fetch(process.env.NEXTAUTH_URL + "/api/auth/signin", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);
        return data;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
};

export default NextAuth(authOptions);
