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
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password", placeholder: "" },
      },
      async authorize(credentials): Promise<any> {
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
};

export default NextAuth(authOptions);
