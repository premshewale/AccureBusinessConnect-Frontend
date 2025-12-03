import axios from "axios";
export const baseURL = "https://backend.abc.techsofast.com/api";
// Axios instance
const api = axios.create({
  baseURL,
});

// ================= REQUEST INTERCEPTOR =================
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (user?.role) {
      config.headers["X-User-Role"] = user.role;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // ========== 401 — Token expired or invalid ==========
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");  // also remove user
      window.location.href = "/admin/login";
    }

    // ========== 403 — No Permission ==========
    if (status === 403) {
      window.location.href = "/unauthorized";
    }

    return Promise.reject(error);
  }
);

export default api;
