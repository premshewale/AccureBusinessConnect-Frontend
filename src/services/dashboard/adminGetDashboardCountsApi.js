import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

// GET /api/dashboard/counts
export const adminGetDashboardCounts = createAsyncThunk(
  "dashboard/getCounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/dashboard/counts");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard counts"
      );
    }
  }
);
