import axios, { AxiosResponse } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Response<T = any, D = any> = AxiosResponse<T, D>;

export default axios.create({
  baseURL: "http://localhost:8080/events",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});
