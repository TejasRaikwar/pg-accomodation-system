import axios from "axios";

const BASE_URL = "http://localhost:8085"; // Change this if you move to prod

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Automatically attach JWT token from localStorage (or wherever you store it)
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

export default api;
