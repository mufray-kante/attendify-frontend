import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

let token = null;

export const setToken = (newToken) => {
  token = newToken;
  api.defaults.headers.common['Authorization'] = Bearer ;
};

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = Bearer ;
  }
  return config;
});
