import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api/",
  withCredentials: true,
});

export default api;