import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../services/auth/authService";

// =========== LOGIN THUNK ===========
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
      console.log(email,password);
    try {
      const res = await loginApi({ email, password });
        console.log(res);
      // Save token & user in localStorage
      if (res.token) {
        localStorage.setItem("token", res.token);
      }
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      return res;
    } catch (error) {
        console.log(error);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
