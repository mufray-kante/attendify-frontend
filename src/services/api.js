import axios from "axios";

const BASE_URL = "https://attendify-backend-production-cdb4.up.railway.app/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional if cookies used
});

// Optional: global response interceptor
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
