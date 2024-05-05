"use client";

import { getServerUrl } from "@/lib/util/util";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

// 이걸 어디서 호출하는 것이 좋을까
export const useInitUser = () => {
  const { data: session, status } = useSession();

  const { url: currentUrl } = getServerUrl();

  if (!session) throw new Error("Unauthorized");

  if (session && session.user && session.user.tokenInfo) {
    const { tokenInfo } = session.user;

    if (tokenInfo.APP_KEY == null || tokenInfo.APP_SECRET == null) {
      if (currentUrl != "/v/my") {
        if (confirm("Please enter your app key and secret.")) {
          redirect("/v/my");
        }
      }
    }
  }
};
