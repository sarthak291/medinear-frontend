import axios from "axios";

// Base URL from env (works for localhost + render)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach token automatically
api.interceptors.request.use(
  (config) => {
    const storeToken = localStorage.getItem("storeToken");

    if (storeToken) {
      config.headers.Authorization = `Bearer ${storeToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
