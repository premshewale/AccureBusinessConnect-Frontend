import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi"; // your axios instance

// Fetch current user profile
export const getMyProfile = createAsyncThunk(
  "profile/getMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/users/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);
