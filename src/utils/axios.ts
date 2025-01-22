import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_BASE_URL } from "@/constants/baseurl";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleApiError = (error: any): never => {
  throw new Error(
    error.response?.data?.message || "An error occurred. Please try again."
  );
};

export const apiCall = async <T>(
  method: AxiosRequestConfig["method"],
  url: string,
  data?: any,
  params?: any
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = { method, url, data, params };
    const response: AxiosResponse<T> = await axiosInstance.request<T>(config);

    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
  return Promise.reject(new Error("Unhandled error occurred"));
};
