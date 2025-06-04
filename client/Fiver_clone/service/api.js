import axios from "axios";
import { logoutUser, refreshAccessToken } from "../src/redux/AuthSlice/authSlice";

const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { store } = await import("../src/redux/store");
        await store.dispatch(refreshAccessToken());
        return api(originalRequest);
      } catch (refreshError) {
        const { store } = await import("../src/redux/store");
        store.dispatch(logoutUser());


        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default api;