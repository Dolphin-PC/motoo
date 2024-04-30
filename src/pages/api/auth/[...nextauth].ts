import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/setting/firebase";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Email/Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password", placeholder: "" },
      },
      async authorize(credentials): Promise<any> {
        // 로그인 로직
        return await signInWithEmailAndPassword(
          auth,
          credentials!.email,
          credentials!.password
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }

            return null;
          })
          .catch((err) => {
            console.error(err);
          });
      },
    }),
  ],
  // TODO : Add jwt and session callbacks
  // callbacks: {
  //   jwt: async (token, user, account, profile, isNewUser) => {
  //     if (user) {
  //       token = user;
  //     }

  //     return token;
  //   },
  //   session: async (session, user) => {
  //     session.token = user.token;
  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
