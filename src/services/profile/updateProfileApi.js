import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const updateMyProfile = createAsyncThunk(
  "profile/updateMyProfile",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminApi.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);
