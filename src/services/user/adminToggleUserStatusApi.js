import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

// ✅ Activate user
export const adminActivateUser = createAsyncThunk(
  "adminActivateUser/activate",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/users/${id}/activate`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to activate user"
      );
    }
  }
);

// ✅ Deactivate user
export const adminDeactivateUser = createAsyncThunk(
  "adminDeactivateUser/deactivate",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/users/${id}/deactivate`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to deactivate user"
      );
    }
  }
);
