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

export const fetchHelper = <T>({
  url,
  data,
  method,
}: {
  url: string;
  data: T;
  method: "GET" | "POST" | "PUT" | "DELETE";
}) => {
  return fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export const convertSnakeCaseToCamelCase = (str: string): string => {
  const words = str.split("_");
  const camelCaseWord = words
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      const firstLetterCap = word.charAt(0).toUpperCase();
      const remainingLetters = word.slice(1);
      return firstLetterCap + remainingLetters;
    })
    .join("");

  return camelCaseWord;
};
export const convertObjectPropertiesSnakeCaseToCamelCase = (
  obj: Record<string, any>
): Record<string, any> => {
  const convertedObject: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelCaseKey = convertSnakeCaseToCamelCase(key);
    convertedObject[camelCaseKey] = value;
  }

  return convertedObject;
};
