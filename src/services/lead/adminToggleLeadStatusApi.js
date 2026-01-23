import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

// ✅ Activate lead
export const adminActivateLead = createAsyncThunk(
  "adminActivateLead/activate",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/leads/${id}/activate`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to activate lead"
      );
    }
  }
);

// ✅ Deactivate lead
export const adminDeactivateLead = createAsyncThunk(
  "adminDeactivateLead/deactivate",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/leads/${id}/deactivate`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to deactivate lead"
      );
    }
  }
);
