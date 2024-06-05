import { AccountInfo } from "@/pages/model/AccountInfo";
import { ValidationError } from "class-validator";
import { Session } from "next-auth";
import crypto from "crypto";

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

  // console.log(session.user);

  let currentAccount =
    session.user.currentAccountInfo ||
    session.user.accountInfoList?.filter((account) => {
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

export const convertObjectPropertiesCamelCaseToSnakeCase = (
  obj: Record<string, any>
): Record<string, any> => {
  const convertedObject: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeCaseKey = key.replace(
      /[A-Z]/g,
      (match) => `_${match.toLowerCase()}`
    );
    convertedObject[snakeCaseKey] = value;
  }
  return convertedObject;
};

export const getMessageFromValidaionError = (error: ValidationError) => {
  if (error.constraints) {
    return Object.values(error.constraints)[0];
  }
  return "Is not exists at validation error";
};

// convert string from object
export const convertObjectToQuery = (obj: Record<string, any>) => {
  let str = [];
  for (const [key, value] of Object.entries(obj)) {
    str.push(`${key}=${value}`);
  }
  return str.join("&");
};

// export const separateHeaderAndRow = (dataList: Record<string, any>[]) => {
//   let headers: TTableHeader[] = Object.keys(dataList[0]).map((key) => {
//     return {
//       displayName: TableDisplayName[key],
//       key: key,
//       type: getTableRowType(key),
//     };
//   });

//   const row = dataList.map((data) => {
//     return Object.values(data);
//   });

//   return { headers, row }; // Fix the variable name from 'header' to 'headers'
// };

/** @desc 한국시간기준으로 시간을 구합니다. */
export const getKoreanTime = (date?: Date): Date => {
  const now = new Date(date || new Date());
  const utc = now.getTime();
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const korNow = new Date(utc + koreaTimeDiff);

  return korNow;
};

/** @desc 서버시간 -> 클라이언트시간 변환
 *
 * @param date
 */
export const splitDate = (date: Date) => {
  const localTime = date.toISOString();
  const [_day, _time] = localTime.split("T");

  const [year, month, day] = _day.split("-");
  let [hour, minute, second] = _time.split(":");
  second = second.split(".")[0];

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
  };
};

/** @desc HHmmss -> HH:mm:ss */
export const sixDateToHourMinute = (date: string) => {
  return date.slice(0, 2) + ":" + date.slice(2, 4) + ":" + date.slice(4, 6);
};

export const isEmpty = (value: any) => {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    Object.keys(value).length === 0
  );
};

/** @desc 숫자를 한국식 표기법으로 변환합니다.
 *
 * @param str
 * @param format
 * @returns
 */
export const stringToNumberLocale = (str: string, format?: boolean) => {
  if (isNaN(Number(str))) return str;
  if (format) {
    if (str.length > 12) {
      return Number(str).toLocaleString().slice(0, -12) + "조";
    } else if (str.length > 8) {
      return Number(str).toLocaleString().slice(0, -8) + "억";
    } else if (str.length > 4) {
      return Number(str).toLocaleString().slice(0, -4) + "만";
    }
  }
  return Number(str).toLocaleString();
};

export function isJson(str: any) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const getSessionStorageItem = (key: string): any => {
  const item = sessionStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
};

export const setSessionStorageItem = (key: string, value: any): void => {
  const item = JSON.stringify(value);
  sessionStorage.setItem(key, item);
};

/** @desc AES256 복호화
 * @see https://github.com/koreainvestment/open-trading-api/blob/62b58f44bf126b1790439ee0aaff1ab44e1cd759/websocket/java/OpsWsSample/src/main/java/com/ops/AES256.java#L9
 * @param cipherText
 * @param key
 * @param iv
 * @returns
 */
export const decryptAES256 = (
  cipherText: string,
  key: string,
  iv: string
): string => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(cipherText, "base64", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

type TWebSocketMessageRes = {
  /**암호화유무(0암호화X / 1암호화) */
  isEncrypt: "0" | "1" | string;
  tr_id: string;
  dataCount: string;
  data: string;
};
export const splitWebSocketMessage = (
  message: string
): TWebSocketMessageRes => {
  const msg = message.split("|");

  return {
    isEncrypt: msg[0],
    tr_id: msg[1],
    dataCount: msg[2],
    data: msg[3],
  };
};

/** 20240101 -> 2024-01-01 */
export const stringToDateString = (str: string) => {
  return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`;
};
