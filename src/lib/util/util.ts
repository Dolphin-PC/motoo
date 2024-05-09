import { AccountInfo } from "@/pages/model/AccountInfo";
import { Session } from "next-auth";
import { SessionContextValue } from "next-auth/react";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import dynamic from "next/dynamic";
import { headers } from "next/headers";

export const getServerUrl = () => {
  // FIXME : dynamic import 를 사용하면 에러가 발생한다.
  // const headers2 = dynamic<ReadonlyHeaders>(() =>
  //   import("next/headers").then((mod) => mod.headers)
  // );
  // // headers();
  // const headersList = headers();
  // const domain = headersList.get("host") || "";
  // const fullUrl = headersList.get("referer") || "";
  // return {
  //   fullUrl,
  //   url: fullUrl.split(domain)[1] || "",
  // };
};

export const getUserTokenInfo = (
  session: Session
): {
  appKey: AccountInfo["appKey"] | null;
  appSecret: AccountInfo["appSecret"] | null;
} => {
  let app_key = null;
  let app_secret = null;

  let currentAccount = session.user.accountInfoList?.filter((account) => {
    return account.defaultAccountYn === true;
  })[0];

  if (currentAccount) {
    app_key = currentAccount.appKey;
    app_secret = currentAccount.appSecret;
  }
  return {
    appKey: app_key,
    appSecret: app_secret,
  };
};
