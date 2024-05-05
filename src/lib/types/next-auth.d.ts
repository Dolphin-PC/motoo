import { User } from "@/pages/model/User";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  type Session = {
    user: User;
  } & DefaultSession;
}
