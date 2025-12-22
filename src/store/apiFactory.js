import axios from "axios";

const BASE_URL = "https://backend.abc.techsofast.com/api";

const api = (role) => {
  const apiInstance = axios.create({
    
    baseURL: BASE_URL,
  });

  const roleUpper = role.toUpperCase();

  const accessTokenKey = `${role}AccessToken`;
  const refreshTokenKey = `${role}RefreshToken`;

  // REQUEST
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(accessTokenKey);
      if (token) config.headers.Authorization = `Bearer ${token}`;
      config.headers["X-User-Role"] = roleUpper;
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

        try {
          const refreshToken = localStorage.getItem(refreshTokenKey);

          const res = await axios.post(`${BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });

          localStorage.setItem(accessTokenKey, res.data.accessToken);

          apiInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;

          return apiInstance(original);
        } catch (err) {
          localStorage.removeItem(accessTokenKey);
          localStorage.removeItem(refreshTokenKey);

          window.location.href = `/${role}/login`;
        }
      }

      return Promise.reject(error);
    }
  );

  return apiInstance;
};

export default api;
 
