import axios from "axios";

const api = axios.create({
  baseURL: "https://medinear-backend.onrender.com/api",
});

export default api;
