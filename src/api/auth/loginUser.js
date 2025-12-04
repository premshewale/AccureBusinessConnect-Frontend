//Login user
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../services/auth/authService";

// =========== LOGIN THUNK ===========
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginApi({ email, password });

      // Save accessToken, refreshToken & user in localStorage
      if (res.accessToken) localStorage.setItem("accessToken", res.accessToken);
      if (res.refreshToken) localStorage.setItem("refreshToken", res.refreshToken);
      if (res.user) localStorage.setItem("user", JSON.stringify(res.user));

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
