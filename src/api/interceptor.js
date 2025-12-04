//interceptor
import axios from "axios";
export const baseURL = "https://backend.abc.techsofast.com/api";
// Axios instance
const api = axios.create({
  baseURL,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Only add X-User-Role if user is logged in AND not login route
    if (user?.roleName && !config.url.includes("/auth/login") && !config.url.includes("/auth/refresh-token")) {
      config.headers["X-User-Role"] = user.roleName;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);


// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // 401 = Token expired
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token API
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(`${baseURL}/auth/refresh-token`, { refreshToken });

        // Save new access token
        localStorage.setItem("accessToken", res.data.accessToken);
        // api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
        api.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;


        // Retry original request
        return api(originalRequest);
      } catch (err) {
        // Logout if refresh fails
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/admin/login";
        return Promise.reject(err);
      }
    }

    // 403 = Unauthorized
    if (status === 403) {
      window.location.href = "/unauthorized";
    }

    return Promise.reject(error);
  }
);

export default api;


