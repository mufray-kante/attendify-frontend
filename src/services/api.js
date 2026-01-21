// src/services/api.js
import axios from "axios";

// Base URL of your deployed backend
const BASE_URL = "https://attendify-backend-production-cdb4.up.railway.app/api/v1";

// Create an axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // in case your backend uses cookies
});

// Optional: add a response interceptor to handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // network error
      alert("Network error: Unable to connect to server.");
    } else if (error.response.status === 401) {
      // unauthorized
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);
