import { AccountInfo } from "@/pages/model/AccountInfo";
import { ValidationError } from "class-validator";
import { Session } from "next-auth";

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
export const getKoreanTime = (date?: Date) => {
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

/** @desc HHmmss -> HH:mm */
export const sixDateToHourMinute = (date: string) => {
  return date.slice(0, 2) + ":" + date.slice(2, 4);
};

export const isEmpty = (value: any) => {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    Object.keys(value).length === 0
  );
};
