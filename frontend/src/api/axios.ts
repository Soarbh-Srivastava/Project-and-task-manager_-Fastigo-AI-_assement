import axios from "axios";
import { getStoredToken } from "../store/authStorage";
import { toast } from "react-toastify";

const baseURL =
  import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:9000";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Show toast notifications on response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseData = error?.response?.data;

    const messageFromArray = Array.isArray(responseData?.errors)
      ? responseData.errors
          .map((item: unknown) => {
            if (typeof item === "string") {
              return item;
            }
            if (
              typeof item === "object" &&
              item !== null &&
              "msg" in item &&
              typeof (item as { msg: unknown }).msg === "string"
            ) {
              return (item as { msg: string }).msg;
            }
            return null;
          })
          .filter(Boolean)
          .join(", ")
      : undefined;

    const message =
      (typeof responseData?.message === "string" && responseData.message) ||
      (typeof responseData?.error === "string" && responseData.error) ||
      (typeof responseData === "string" && responseData) ||
      messageFromArray ||
      (typeof error?.message === "string" && error.message) ||
      "Request failed";
    try {
      toast.error(message);
    } catch (e) {
      // noop if toast can't be shown (e.g. not mounted)
    }
    return Promise.reject(error);
  },
);

export default api;
