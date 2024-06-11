import { CResponse, StatusCode } from "@/pages/api";
import axios, { AxiosRequestConfig } from "axios";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export type TResponse<T> = {
  result: true;
  code: 1000;
  data: T;
};

export type TErrorResponse<T> = {
  result: false;
  code: number;
  data: T;
};

export const fetchHelper = <T>({
  url,
  data,
  method,
  options,
}: {
  url: string;
  data?: T;
  method: "GET" | "POST" | "PUT" | "DELETE";
  options?: RequestInit;
}) => {
  return fetch(url, {
    method,
    body: JSON.stringify(data),
    ...options,
    headers: { "Content-Type": "application/json" },
  });
};

/** Next 서버의 API호출용 */
export const fetchHelperWithData = async <T, R>({
  url,
  data,
  method,
  options,
}: {
  url: string;
  data?: T;
  method: "GET" | "POST" | "PUT" | "DELETE";
  options?: RequestInit;
}): Promise<CResponse<R>> => {
  return new Promise((resolve, reject) => {
    fetchHelper<T>({ url, data, method, options })
      .then(async (res) => {
        let responseData = (await res.json()) as CResponse<R>;
        // console.log(responseData);

        if (responseData.status == StatusCode.INVALID) {
          throw responseData;
        }

        resolve(responseData);
      })
      .catch((err) => {
        console.error(err);
        // err객체내부에 Error객체가 있다면, Error객체의 message를 출력하고
        // 그 외의 경우에는 err.message가 있다면, 출력
        alert(err?.error?.message || err?.message);
        reject(err);
      });
  });
};

const axiosInstance = axios.create({});

/** 한국투자증권 API 전용 */
// TODO: 토큰만료 응답시, 토큰 재발급 후 재요청
export const axiosGet = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await axiosInstance.get<T>(url, config);
  // console.log("axiosGet", res);
  return res.data;
};

export const axiosPost = async <T, R>(
  url: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<R> => {
  const res = await axiosInstance.post<R>(url, data, config);

  return res.data;
};
