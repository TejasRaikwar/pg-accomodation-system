import axios from "axios";

const BASE_URL = "http://localhost:8085"; // API Gateway URL

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ⬅️ important for cookies/auth if needed
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
