import axios from "axios";

const api = axios.create({
  baseURL: "https://medinear-backend.onrender.com/api",
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
