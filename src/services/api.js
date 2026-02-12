import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/v1`
    : "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

/* ===========================
   REQUEST INTERCEPTOR
=========================== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===========================
   RESPONSE INTERCEPTOR
   Auto logout on 401
=========================== */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;