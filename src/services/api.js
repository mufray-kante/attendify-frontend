import axios from "axios";

// MUST match the .env variable name exactly
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // keep this for cookies / auth
});

// Global response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      alert("Network error: Unable to connect to server.");
    } else if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);
