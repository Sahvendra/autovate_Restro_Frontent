import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Use import.meta.env instead of process.env
  timeout: 10000,
  // withCredentials:true,
  headers: {
    "Content-Type": "application/json",
  },
});
