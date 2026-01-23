import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

// Update lead status by ID
export const adminUpdateLeadStatusApi = createAsyncThunk(
  "adminLead/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await adminApi.put(`/leads/${id}/status`, { status });
      return response.data; // Returns updated lead
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update lead status"
      );
    }
  }
);
