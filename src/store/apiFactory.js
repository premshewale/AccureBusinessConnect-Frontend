import axios from "axios";

const BASE_URL = "https://backend.abc.techsofast.com/api";

const api = () => {
  const apiInstance = axios.create({
    baseURL: BASE_URL,
  });

  // REQUEST
  apiInstance.interceptors.request.use(
    (config) => {
      const possibleRoles = ["ADMIN", "SUB_ADMIN", "STAFF"];

      for (const role of possibleRoles) {
        const token = localStorage.getItem(`${role}AccessToken`);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          config.headers["X-User-Role"] = role;
          break;
        }
      }

      config.headers["Content-Type"] = "application/json";
      return config;
    },
    (error) => Promise.reject(error)
  );

  // RESPONSE
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error.config;

      if (error.response?.status === 401 && !original._retry) {
        original._retry = true;

        const possibleRoles = ["ADMIN", "SUB_ADMIN", "STAFF"];

        for (const role of possibleRoles) {
          const refreshToken = localStorage.getItem(`${role}RefreshToken`);

          if (refreshToken) {
            try {
              const res = await axios.post(
                `${BASE_URL}/auth/refresh-token`,
                { refreshToken }
              );

              localStorage.setItem(
                `${role}AccessToken`,
                res.data.accessToken
              );

              original.headers.Authorization = `Bearer ${res.data.accessToken}`;
              original.headers["X-User-Role"] = role;

              return apiInstance(original);
            } catch {
              localStorage.clear();
              window.location.href = "/login";
            }
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return apiInstance;
};

export default api;

