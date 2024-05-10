import { CResponse } from "@/pages/api";
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
  data: T;
  method: "GET" | "POST" | "PUT" | "DELETE";
}) => {
  return fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export const fetchHelperWithData = async <T>({
  url,
  data,
  method,
}: {
  url: string;
  data: T;
  method: "GET" | "POST" | "PUT" | "DELETE";
}) => {
  return new Promise((resolve, reject) => {
    fetchHelper<T>({ url, data, method })
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
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
