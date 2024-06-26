import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { nextAuthJwt, nextAuthPages } from "@/lib/setting/nextAuth";
import { getSessionStorageItem, setSessionStorageItem } from "@/lib/util/util";
import { SYNC_ID } from "@/app/v/main/Init";

export const authOptions: NextAuthOptions = {
  pages: nextAuthPages,
  providers: [
    CredentialsProvider({
      name: "Email/Password",
      credentials: {
        email: {}, // 커스텀 페이지를 이용하므로 스킵
        password: {}, // 커스텀 페이지를 이용하므로 스킵
      },
      async authorize(credentials): Promise<any> {
        // console.log("credentials", credentials);
        // 로그인 로직
        const res = await fetch(process.env.NEXTAUTH_URL + "/api/auth/login", {
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
  // 각 항목의 메소드가 [성공?]했을 때의 callback함수
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      // console.log("signIn", user, account, profile);

      // TODO db last login update
      return true;
    },
    // XXX session/jwt는 getSession(), getServerSession(), useSession() 함수실행시 호출됨
    // https://next-auth.js.org/configuration/callbacks
    session: async ({ session, token, user }) => {
      // console.log("[session]", session);

      session.user = token;
      return session;
    },
    jwt: async ({ user, token, trigger, session }) => {
      // console.log("[jwt]", token);
      // console.log("[jwt]", session);
      if (trigger === "update" && session !== null) {
        token = session;
      }
      return { ...user, ...token };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  jwt: nextAuthJwt,
};

export const signOutCallback = async () => {
  // 잔고조회 동기화 flag 초기화
  setSessionStorageItem(SYNC_ID, null);
};

export default NextAuth(authOptions);
