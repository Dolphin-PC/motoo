import { CResponse, EnumCResponseStatus } from "@/pages/api";
import axios, { AxiosRequestConfig } from "axios";

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
}: {
  url: string;
  data?: T;
  method: "GET" | "POST" | "PUT" | "DELETE";
}) => {
  return fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export const fetchHelperWithData = async <T, R>({
  url,
  data,
  method,
}: {
  url: string;
  data?: T;
  method: "GET" | "POST" | "PUT" | "DELETE";
}): Promise<CResponse<R>> => {
  return new Promise((resolve, reject) => {
    fetchHelper<T>({ url, data, method })
      .then(async (res) => {
        let responseData = (await res.json()) as CResponse<R>;
        // console.log(responseData);

        if (responseData.status == EnumCResponseStatus.INVALID) {
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

export const axiosGet = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await axiosInstance.get<T>(url, config);
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
