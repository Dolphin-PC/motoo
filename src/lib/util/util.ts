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
  app_key: AccountInfo["appKey"];
  app_secret: AccountInfo["app_secret"];
} => {
  let app_key = null;
  let app_secret = null;

  if (session.user.accountInfo) {
    app_key = session.user.accountInfo.app_key;
    app_secret = session.user.accountInfo.app_secret;
  }
  return {
    app_key,
    app_secret,
  };
};
