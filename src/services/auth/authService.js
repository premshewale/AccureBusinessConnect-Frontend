
//Auth service
import api from "../../api/interceptor";

export const loginApi = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
