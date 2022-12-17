import axios, { AxiosResponse } from "axios";
import { USER_STORAGE_KEY } from "../constants";
const dateKeyRx = /date/i;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Response<T = any, D = any> = AxiosResponse<T, D>;

const http = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem(USER_STORAGE_KEY) ? JSON.parse(localStorage.getItem(USER_STORAGE_KEY)!).token : ""}`
  },
  withCredentials: false,
  transformResponse: (data) => JSON.parse(data, (key, value) => dateKeyRx.test(key) ? new Date(Date.parse(value)) : value)
});

export default http