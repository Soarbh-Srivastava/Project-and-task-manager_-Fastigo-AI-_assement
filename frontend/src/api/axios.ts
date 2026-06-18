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
    const message =
      error?.response?.data?.message || error?.message || "Request failed";
    try {
      toast.error(message);
    } catch (e) {
      // noop if toast can't be shown (e.g. not mounted)
    }
    return Promise.reject(error);
  },
);

export default api;
