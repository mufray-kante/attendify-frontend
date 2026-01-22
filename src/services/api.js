import axios from "axios";

// VITE environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: global response interceptor for network/auth errors
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
